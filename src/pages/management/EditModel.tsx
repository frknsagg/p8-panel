import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { BrandModelAdd } from "../../models/requests/BrandModelAdd";
import BrandService from "../../services/BrandService";
import { useParams } from "react-router-dom";
import { BrandModel } from "../../models/responses/BrandModel";
import { number } from "yup";
import { BrandModelUpdate } from "../../models/requests/BrandModelUpdate";
import ModelService from "../../services/ModelService";
import { ModelUpdate } from "../../models/requests/ModelUpdate";

type Props = {};

const EditModel = (props: Props) => {
  const modelService: ModelService = new ModelService();
  const brandService: BrandService = new BrandService();
  const [brands, setBrands] = useState<BrandModel[]>([]);

  const params = useParams<{ id: string }>();

  const [models, setModels] = useState<BrandModel>();

  useEffect(() => {
    if (params.id) {
      fetchModels(parseInt(params.id, 10));
      fetchBrands();
    }
  }, [models]);

  const fetchModels = async (modelId: number) => {
    const response = await modelService.getById(modelId);
    setModels(response.data.data);
  };
  const fetchBrands = async () => {
    try {
      const brandsResponse = await brandService.getAll();

      // Markaların bulunduğu bir dizi
      const fetchedBrands = brandsResponse.data.data;

      // Markaları state'e set et
      setBrands(fetchedBrands);

      // Diğer işlemleri gerçekleştir...
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };



  const onSubmit = async (values: any) => {
    try {
      const modelData: ModelUpdate = {
        id: models!.id,
        name: values.modelName,
        brandId : values.brandId,
      };
console.log(modelData);
      const response = await modelService.update(modelData);

      console.log("Brand updated successfully:", response);
      if (response.data && "message" in response.data) {
        alert(response.data.message);
      } else {
        console.error("Response does not contain a message property.");
      }
    } catch (error) {}
  };

  const initialValues = {
    modelName: models?.name,
    brandId: 0
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { resetForm }) => {
              onSubmit(values);

              // Örnek olarak formu sıfırla ve başlangıç değerlerini atayabilirsin
              resetForm({
                values: initialValues,
              });
            }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <h2>GÜNCELLE</h2>
                <div>
                  <label>Markasını Seçin</label>
                  <Field
                    as="select"
                    name="brandId"
                    onChange={(e: any) => {
                      setFieldValue("brandId", parseInt(e.target.value, 10));
                    }}
                  >
                    <option value="" disabled>
                      Seç
                    </option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="selectedBrandId" component="div" />
                </div>
                <div>
                  <label>Model Adı</label>
                  <Field type="text" name="modelName" placeholder={models?.name} />
                  <ErrorMessage name="modelName" component="div" />
                </div>

                {/* Diğer form alanları ve butonlar... */}

                <button type="submit">Kaydet</button>
              </Form>
            )}
          </Formik>
        </article>
      </main>
    </div>
  );
};

export default EditModel;

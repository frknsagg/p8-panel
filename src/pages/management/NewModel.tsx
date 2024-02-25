import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { ErrorMessage, Field, Form, Formik } from "formik";
import ModelService from "../../services/ModelService";
import { ModelAdd } from "../../models/requests/ModelAdd";
import BrandService from "../../services/BrandService";
import { BrandModel } from "../../models/responses/BrandModel";

type Props = {};

const NewModel = (props: Props) => {
  const modelService: ModelService = new ModelService();
  const brandService: BrandService = new BrandService();

  const [brands, setBrands] = useState<BrandModel[]>([]);
  const onSubmit = async (values: any) => {
    console.log(values);
    try {
      const modelData: ModelAdd = {
        name: values.name,
        brandId: values.brandId,
      };

      const response = await modelService.add(modelData);

      console.log("Brand added successfully:", response);
      if (response.data && "message" in response.data) {
        alert(response.data.message);
      } else {
        console.error("Response does not contain a message property.");
      }
    } catch (error) {}
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

  useEffect(() => {
    fetchBrands();
  }, [brands]);

  const initialValues = {
    name: "",
    brandId: 0,
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
                <h2>YENİ Model</h2>
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
                  <Field type="text" name="name" placeholder="Model Adı" />
                  <ErrorMessage name="name" component="div" />
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

export default NewModel;

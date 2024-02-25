import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { BrandModelAdd } from "../../models/requests/BrandModelAdd";
import BrandService from "../../services/BrandService";
import { useParams } from "react-router-dom";
import { BrandModel } from "../../models/responses/BrandModel";
import { number } from "yup";
import { BrandModelUpdate } from "../../models/requests/BrandModelUpdate";

type Props = {};

const EditBrand = (props: Props) => {
  const brandService: BrandService = new BrandService();
  const params = useParams<{ id: string }>();

  const [brand, setBrand] = useState<BrandModel>();

  useEffect(() => {
    if (params.id) {
      fetchBrands(parseInt(params.id, 10));
    }
  }, []);

  const fetchBrands = async (brandId: number) => {
    const response = await brandService.getById(brandId);
    setBrand(response.data.data);
  };

  const onSubmit = async (values: any) => {
    try {
      const brandModelData: BrandModelUpdate = {
        id: brand!.id,
        name: values.brandName,
      };
console.log(brandModelData);
      const response = await brandService.update(brandModelData);

      console.log("Brand updated successfully:", response);
      if (response.data && "message" in response.data) {
        alert(response.data.message);
      } else {
        console.error("Response does not contain a message property.");
      }
    } catch (error) {}
  };

  const initialValues = {
    brandName: brand?.name
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
                  <label>Marka Adı</label>
                  <Field type="text" name="brandName" placeholder={brand?.name} />
                  <ErrorMessage name="brandName" component="div" />
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

export default EditBrand;

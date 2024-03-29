import React from 'react'
import AdminSidebar from '../../components/AdminSidebar';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import ModelService from '../../services/ModelService';
import { BrandModelAdd } from '../../models/requests/BrandModelAdd';
import BrandService from '../../services/BrandService';
import UserService from '../../services/UserService';


type Props = {}



const NewUser = (props: Props) => {
    const service: UserService = new UserService();
    const onSubmit = async (values: any) => {
      // try {
      //  const brandModelData : BrandModelAdd = {
      //    name : values.name,
      //  }
   
      //  const response = await service.add(brandModelData);

      //  console.log('Brand added successfully:', response);
      //  if (response.data && 'message' in response.data) {
      //   alert(response.data.message);
      // } else {
      //   console.error('Response does not contain a message property.');
      // }
      // } catch (error) {
       
      // }
     };
   
   const initialValues = {
      name:"",
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
            <h2>YENİ MARKA</h2>

            <div>
              <label>Marka Adı</label>
              <Field type="text" name="name" placeholder="Marka Adı" />
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
  )
}

export default NewUser
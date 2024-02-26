import { useState, ChangeEvent, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import BrandService from "../../services/BrandService";
import { BrandModel } from "../../models/responses/BrandModel";
import { Model } from "../../models/responses/Model";
import ModelService from "../../services/ModelService";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import CarService from "../../services/CarService";
import ColorService from "../../services/ColorService";
import { ColorModel } from "../../models/responses/ColorModel";

const NewProduct = () => {
  let brandService: BrandService = new BrandService();
  let modelService: ModelService = new ModelService();
  let carService: CarService = new CarService();
  let colorService: ColorService = new ColorService();

  const [photo, setPhoto] = useState<File | null>(null);

  const [selectedBrandId, setSelectedBrandId] = useState(0);
  const [selectedModelId, setSelectedModelId] = useState(0);
  const [selectedColorId, setSelectedColorId] = useState(0);

  const [brands, setBrands] = useState<BrandModel[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [colors, setColors] = useState<ColorModel[]>([]);

  const fetchColors = async () => {
    try {
      const colorsResponse = await colorService.getAll();
      const fetchedColors = colorsResponse.data.data;
      setColors(fetchedColors);
    } catch (error) {
      console.error("Error fetching colors:", error);
      // Hata durumunu kullanıcıya bildirebilirsiniz
    }
  };

  const fetchBrands = async () => {
    try {
      const brandsResponse = await brandService.getAll();
      const fetchedBrands = brandsResponse.data.data;
      setBrands(fetchedBrands);
    } catch (error) {
      console.error("Error fetching brands:", error);
      // Hata durumunu kullanıcıya bildirebilirsiniz
    }
  };

  useEffect(() => {
    fetchColors();
    fetchBrands();
  }, []);

  const fetchModelsByBrandId = async (brandId: number) => {
    try {
      const response = await modelService.getByBrandId(brandId);
      const fetchedModels = response.data.data;
      setModels(fetchedModels);
    } catch (error) {
      console.error("Error fetching models:", error);
      // Hata durumunu kullanıcıya bildirebilirsiniz
    }
  };

  const handleBrandChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const brandId = parseInt(e.target.value, 10);
    setSelectedBrandId(brandId);
    fetchModelsByBrandId(brandId);
  };

  const validationSchema = Yup.object().shape({
    plate: Yup.string().required("Plaka alanı zorunludur"),
    dailyPrice: Yup.number().required("Fiyat alanı zorunludur"),
    kilometer: Yup.number().required("Kilometre alanı zorunludur"),
    year: Yup.number().required("Yıl alanı zorunludur"),
    photo: Yup.mixed().required("Fotoğraf alanı zorunludur"),
  });

  const initialValues = {
    plate: "",
    selectedModelId: 0,
    selectedColorId: 0,
    dailyPrice: 0,
    kilometer: 0,
    year: 0,
    photo: null,
  };

  const onSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append('carState', 'AVAILABLE');
      formData.append("file", values.photo);
      formData.append("plate", values.plate);
      formData.append("brandId", selectedBrandId.toString());
      formData.append("modelId", selectedModelId.toString());
      formData.append("colorId", selectedColorId.toString());
      formData.append("dailyPrice", values.dailyPrice.toString());
      formData.append("kilometer", values.kilometer.toString());
      formData.append("year", values.year.toString());

      await carService.add(formData);
      alert("Araç başarıyla eklendi");
    } catch (error) {
      console.error("Error adding car:", error);
      alert("Araç eklenirken bir hata oluştu");
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              onSubmit(values);
              resetForm({ values: initialValues });
            }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <h2>YENİ ARAÇ</h2>

                <div>
                  <label>plate</label>
                  <Field type="text" name="plate" placeholder="plate" />
                  <ErrorMessage name="plate" component="div" />
                </div>

                <div>
                  <label>Markasını Seçin</label>
                  <Field
                    as="select"
                    name="selectedBrandId"
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                      handleBrandChange(e);
                      setFieldValue("selectedBrandId", e.target.value);
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
                  <label>Modelini Seçin</label>
                  <Field
                    as="select"
                    name="selectedModelId"
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                      setSelectedModelId(parseInt(e.target.value, 10));
                      setFieldValue("selectedModelId", e.target.value);
                    }}
                  >
                    <option value="" disabled>
                      Seç
                    </option>
                    {models.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="selectedModelId" component="div" />
                </div>
                <div>
                  <label>Renk Seçin</label>
                  <Field
                    as="select"
                    name="selectedColorId"
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                      setSelectedColorId(parseInt(e.target.value, 10));
                      setFieldValue("selectedColorId", e.target.value);
                    }}
                  >
                    <option value="" disabled>
                      Seç
                    </option>
                    {colors.map((color) => (
                      <option key={color.id} value={color.id}>
                        {color.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="selectedColorId" component="div" />
                </div>
                <div>
                  <label>Fiyat</label>
                  <Field type="number" name="dailyPrice" placeholder="Fiyat" />
                  <ErrorMessage name="dailyPrice" component="div" />
                </div>

                <div>
                  <label>Kilometre</label>
                  <Field type="number" name="kilometer" placeholder="Kilometre" />
                  <ErrorMessage name="kilometer" component="div" />
                </div>

                <div>
                  <label>Year</label>
                  <Field type="number" name="year" placeholder="Yıl" />
                  <ErrorMessage name="year" component="div" />
                </div>

                <div>
                  <label>Photo</label>
                  <input
                    type="file"
                    name="photo"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setPhoto(e.target.files ? e.target.files[0] : null);
                      setFieldValue("photo", e.currentTarget.files ? e.currentTarget.files[0] : null);
                    }}
                  />
                  <ErrorMessage name="photo" component="div" />
                </div>

                <button type="submit">Kaydet</button>
              </Form>
            )}
          </Formik>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;

import { useState, ChangeEvent, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import BrandService from "../../services/BrandService";
import { BrandModel } from "../../models/responses/BrandModel";
import { Model } from "../../models/responses/Model";
import ModelService from "../../services/ModelService";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const NewProduct = () => {
  let brandService: BrandService = new BrandService();
  let modelService: ModelService = new ModelService();

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [stock, setStock] = useState<number>();
  const [photo, setPhoto] = useState<string>();
  const [year, setYear] = useState<number>();

  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [selectedModelId, setSelectedModelId] = useState("");

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") setPhoto(reader.result);
      };
    }
  };
  const [brands, setBrands] = useState<BrandModel[]>([]);
  const [models, setModels] = useState<Model[]>([]);

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
  }, []);

  useEffect(() => {}, [models]);

  const fetchModelsByBrandId = async (brandId: number) => {
    try {
      const response = await modelService.getByBrandId(brandId);
      // Markaların bulunduğu bir dizi
      const fetchedModels = response.data.data;

      // Markaları state'e set et
      setModels(fetchedModels);
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };

  const handleBrandChange = (e: any) => {
    const brandId = e.target.value;
    setSelectedBrandId(brandId);
    fetchModelsByBrandId(parseInt(brandId, 10));
  };

  const handleModelChange = (e: any) => {
    const modelId = e.target.value;
    setSelectedModelId(modelId);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Plaka alanı zorunludur"),
    selectedBrandId: Yup.string().required("Marka seçimi zorunludur"),
    selectedModelId: Yup.string().required("Model seçimi zorunludur"),
    price: Yup.number().required("Fiyat alanı zorunludur"),
    stock: Yup.number().required("Kilometre alanı zorunludur"),
    year: Yup.number().required("Yıl alanı zorunludur"),
  });

  const onSubmit = (values: any) => {
    // Form submit işlemleri
    console.log(values);
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <Formik
            initialValues={{
              name: "",
              selectedBrandId: "",
              selectedModelId: "",
              price: 0,
              stock: 0,
              year: 0,
              photo: null,
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <h2>YENİ ARAÇ</h2>

              <div>
                <label>PLAKA</label>
                <Field type="text" name="name" placeholder="Plaka" />
                <ErrorMessage name="name" component="div" />
              </div>

              <div>
                <label>Markasını Seçin</label>
                <Field 
                as="select" 
                name="selectedBrandId"
                onChange={(e : any) => {
                  handleBrandChange(e);
                }}>
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
                <Field as="select" name="selectedModelId">
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
                <label>Fiyat</label>
                <Field type="number" name="price" placeholder="Fiyat" />
                <ErrorMessage name="price" component="div" />
              </div>

              <div>
                <label>Kilometre</label>
                <Field type="number" name="stock" placeholder="Kilometre" />
                <ErrorMessage name="stock" component="div" />
              </div>

              <div>
                <label>Year</label>
                <Field type="number" name="year" placeholder="Yıl" />
                <ErrorMessage name="year" component="div" />
              </div>

              <div>
                <label>Photo</label>
                <Field type="file" name="photo" onChange={changeImageHandler} />
                <ErrorMessage name="photo" component="div" />
              </div>
             
              <button type="submit">Kaydet</button>
            </Form>
          </Formik>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;

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
import { CarModelAdd } from "../../models/requests/CarModelAdd";

const NewProduct = () => {
  let brandService: BrandService = new BrandService();
  let modelService: ModelService = new ModelService();
  let carService: CarService = new CarService();
  let colorService: ColorService = new ColorService();

  const [photo, setPhoto] = useState<string>();

  const [selectedBrandId, setSelectedBrandId] = useState(0);
  const [selectedModelId, setSelectedModelId] = useState(0);
  const [selectedColorId, setSelectedColorId] = useState(0);

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
  const [colors, setColors] = useState<ColorModel[]>([]);

  const fetchColors = async () => {
    try {
      const colorsResponse = await colorService.getAll();
      const fetchedColors = colorsResponse.data.data;

      setColors(fetchedColors);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
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
    fetchColors();
    console.log(colors);
    fetchBrands();
  }, [models]);
  

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
    plate: Yup.string().required("Plaka alanı zorunludur"),
    daily_price: Yup.number().required("Fiyat alanı zorunludur"),
    kilometer: Yup.number().required("Kilometre alanı zorunludur"),
    year: Yup.number().required("Yıl alanı zorunludur"),
  });
  const onSubmit = async (values: any) => {
    try {
      // Form verilerini dönüştür
      const carData: CarModelAdd = {
        plate: values.plate,
        daily_price: values.daily_price,
        kilometer: values.kilometer,
        year: values.year,
        colorId: values.selectedColorId,
        modelId: values.selectedModelId,
      };
  
      // CarService.add() ile gönder
      const response = await carService.add(carData);
  
      // Sunucudan gelen yanıtı işleyebilirsiniz (isteğe bağlı)
      console.log('Car added successfully:', response);
  
    } catch (error) {
      // Hata durumunda hata mesajını ve detaylarını göster
      console.error('Car add failed:', error);
    }
  };
  

  const initialValues = {
    plate: "",
    selectedModelId : 0,
    selectedColorId: 0,
    daily_price: 0,
    kilometer: 0,
    year: 0,
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

            // Örnek olarak formu sıfırla ve başlangıç değerlerini atayabilirsin
            resetForm({
              values: initialValues,
            });
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
                  onChange={(e : any) => {
                    handleBrandChange(e);
                    setFieldValue('selectedBrandId', parseInt(e.target.value, 10));
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
                  onChange={(e : any) => {
                    console.log("model değişti", e.target.value);
                    setFieldValue('selectedModelId', parseInt(e.target.value, 10));
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
                  onChange={(e : any) => {
                    console.log("renk değişti değişti", e.target.value);
                    setFieldValue('selectedColorId', parseInt(e.target.value, 10));
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
                <ErrorMessage name="selectedModelId" component="div" />
              </div>
              <div>
                <label>Fiyat</label>
                <Field type="number" name="daily_price" placeholder="Fiyat" />
                <ErrorMessage name="daily_price" component="div" />
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
                <Field type="file" name="photo" onChange={changeImageHandler} />
                <ErrorMessage name="photo" component="div" />
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

export default NewProduct;

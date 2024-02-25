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
import { useParams } from "react-router-dom";
import { CarModel } from "../../models/responses/CarModel";
import { CarModelUpdate } from "../../models/requests/CarModelUpdate";

const EditCar = () => {
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
  const [brandData, setBrandData] = useState<BrandModel>();
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
  const params = useParams<{ id: string }>();

  const [car, setCar] = useState<CarModel>();

  useEffect(() => {
    if (params.id) {
        fetchCar(parseInt(params.id));
    }
  }, []);

  const fetchCar = async (carId: number) => {
    const response = await carService.getById(carId);
    setCar(response.data.data);
  };
  const onSubmit = async (values: any) => {
    const carId = params.id ? parseInt(params.id) : 0; 
    
    try {
      // Form verilerini dönüştür
      const carData: CarModelUpdate = {
        id: carId,
        plate: values.plate,
        daily_price: values.daily_price,
        kilometer: values.kilometer,
        year: values.year,
        colorId: values.selectedColorId,
        modelId: values.selectedModelId,
      };
      console.log(carData);
      // CarService.add() ile gönder
      const response = await carService.update(carData);
  
      // Sunucudan gelen yanıtı işleyebilirsiniz (isteğe bağlı)
      console.log('Car added successfully:', response);
  
    } catch (error) {
      // Hata durumunda hata mesajını ve detaylarını göster
      console.error('Car add failed:', error);
    }
  };
  

  const initialValues = {
    plate: car?.plate,
    selectedModelId : car?.modelResponse.id,
    selectedColorId: car?.colorResponse.id,
    daily_price: car?.daily_price,
    kilometer: car?.kilometer,
    year: car?.year,
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
              <h2>YENİ ARAÇ</h2>

              <div>
                <label>Plaka</label>
                <Field type="text" name="plate" placeholder={car?.plate} />
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
                    setFieldValue('selectedModelId', parseInt(e.target.value, 10));
                  }}
                >
                  <option value={car?.modelResponse.id} >
                    {car?.modelResponse.name}
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
                  <option value={car?.colorResponse.id} >
                   {car?.colorResponse.name}
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
                <Field type="number" name="daily_price" placeholder={car?.daily_price}/>
                <ErrorMessage name="daily_price" component="div" />
              </div>

              <div>
                <label>Kilometre</label>
                <Field type="number" name="kilometer" placeholder={car?.kilometer} />
                <ErrorMessage name="kilometer" component="div" />
              </div>

              <div>
                <label>Year</label>
                <Field type="number" name="year" placeholder={car?.year}  />
                <ErrorMessage name="year" component="div" />
              </div>

              <div>
                <label>Fotoğraf</label>
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

export default EditCar;

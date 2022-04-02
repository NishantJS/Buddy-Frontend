import { useForm } from "react-hook-form";
import { images } from "../../data/addProduct.seller.js";
// import "../../styles/stepper.scss";

const AddProduct = ({ sellerId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  const uploadImage = (data) => {
    const formData = new FormData();
    formData.append([data.target.name], data.target.files[0]);

    fetch(`upload/${sellerId}/d`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* {general.map((element) => {
        let { name, type } = element;
        return (
          <div key={name}>
            <label>{name}</label>
            <input type={type} {...register(name, element)} />
            {errors[name]?.message}
          </div>
        );
      })} */}

      {images.map(({ name, type, accept, required = false }) => {
        return (
          <div key={name}>
            <label>{name}</label>
            <input
              type={type}
              accept={accept}
              {...register(name, { required })}
              onChange={uploadImage}
            />
            {errors[name]?.message}
          </div>
        );
      })}
      <input type="submit" />
    </form>
  );
};

export default AddProduct;

// const Input = ({label, type, }) => {

// }

import useFetch from "../../hooks/useFetch"
import Loading from "./Loading";

const User = () => {

  // const {status,data,loading,error} = useFetch("shop/dog/");

  let toRender;
  // if (loading) {
  //   toRender=<Loading/>
  // } else {
  //   if (error) {
  //     toRender = <>{status} Something Went Wrong</>;
  //   } else {
  //     console.log(data)
  //   }
  // }

  return (
    <div>
      {toRender}
    </div>
  )
}

export default User

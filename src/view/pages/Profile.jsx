import { useSelector } from "react-redux";
import NeedAuth from "../components/NeedAuth";
import ImageCanvas from "../components/setting/ImageCanvas";
import "../../styles/profile.scss";

const Profile = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const seller = useSelector((state) => state.auth.seller);
  
  const isSeller =
    seller && Object.keys(seller).length !== 0 && seller.constructor === Object;
  
  return (
    <section>
      {isAuthenticated ? isSeller ? <SellerAuthenticated seller={seller}/>:<UserAuthenticated/>:<NeedAuth/>}
    </section>
  )
}

const UserAuthenticated = () => {
  // const user = useSelector((state) => state.auth.user);

  return (
    <>
      <ProfileForm/>
      <h1>User Authenticated</h1>
    </>
  );
};

const SellerAuthenticated = ({seller}) => {
  

  return (
    <>
      <ProfileForm/>
      <h1>Seller Authenticated</h1>
    </>
  );
};

export default Profile;


const ProfileForm = () => {
  const draw = ({ ctx, image=false, zoom = 0, X=0,Y=0 }) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    let canvasWidth = ctx.canvas.width;
    let canvasHeight = ctx.canvas.height;
    
    if (image) {
      let imgWidth = image.naturalWidth;
      let imgHeight = image.naturalHeight;
      let screenWidth = canvasWidth;
      let screenHeight = canvasHeight;
      let scaleX = screenWidth / imgWidth;
      let scaleY = screenHeight / imgHeight;
      let scale = scaleY;
      if (scaleX < scaleY) scale = scaleX;
      imgHeight = imgHeight * scale;
      imgWidth = imgWidth * scale;

      let x = 0,
        y = 0;
      if (imgWidth < screenWidth) {
        x = (screenWidth - imgWidth) / 2;
      } else {
        y = (screenHeight - imgHeight) / 2;
      }
      ctx.drawImage(
        image,
        X,
        Y,
        image.naturalWidth,
        image.naturalHeight,
        x,
        y,
        imgWidth - zoom,
        imgHeight - zoom
      ); 
    }
    
    let boxSize = canvasWidth / 2;
    ctx.beginPath();
    ctx.lineWidth = "3";
    ctx.strokeStyle = "#ff7878";
    ctx.strokeRect(boxSize/2, boxSize/2, boxSize, boxSize);
  };
  

  return (
    <>
     <ImageCanvas draw={draw} />
    </>
  );
}
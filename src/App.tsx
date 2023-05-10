import { useState } from 'react'
import './App.scss';
import images from './components/images';
import {FaAngleDoubleRight, FaAngleDoubleLeft} from 'react-icons/fa';

function App() {

  const [duplicateImages, setDuplicateImages]=useState<string[]>(images);

  const [leftClicked, setLeftClicked] = useState<boolean>(false);
  const [rightClicked, setRightClicked] = useState<boolean>(false);

  const click = ()=>{
    setRightClicked(true);
    setTimeout(()=>{
      setRightClicked(false);
    },100);
    // console.log(duplicateImages)
    setDuplicateImages(imgs=>{
      const [firstImg,...imges]=imgs;
      return [...imges,firstImg];
    });
  };

  const leftClick = ()=>{
    setLeftClicked(true);
    setTimeout(()=>{
      setLeftClicked(false);
    },100);

    setDuplicateImages(imgs=>{
      const lastImgArr = imgs.slice(-1);
      const [lastImg] = lastImgArr;
      const newImgs = imgs.slice(0,-1);
      newImgs.unshift(lastImg);
      return newImgs;
    });
    }

  return (
    <div id="outer-wrapper">
      <div id="carousel-container">
        {duplicateImages.map((image, index)=>{
          return (
            <div className="carousel-item" key={`carousel-item${index}`} style={{transform: "translateX(-100%)"}}>

              <img src={image} lazy-loading='true' style={{transform: rightClicked?`translateX(100%)`:leftClicked?`translateX(-100%)`:`translateX(0%)`, transition:(rightClicked || leftClicked)?"transform 0s":"transform 2s"}} alt={`image${index}`} />

              <h1 style={{transform: rightClicked?`translateX(100%)`:leftClicked?`translateX(-100%)`:`translate(-50%,-50%)`, transition:(rightClicked || leftClicked)?"transform 0s":"transform 2s"}}>
              This is menu item-{duplicateImages[index]}
              </h1>
            </div>
          )
        })}
      </div>
      <FaAngleDoubleLeft  onClick={leftClick} />
      <FaAngleDoubleRight  onClick={click} />
    </div>
  );
};

export default App

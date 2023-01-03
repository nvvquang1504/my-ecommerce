import './style.scss';
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai';
import {sliderData} from "./slider-data";
import {useState} from 'react';

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const sliderLength = sliderData.length;
    const prevSlide = () => {
        setCurrentSlide(prevSlide => prevSlide - 1)
    }
    const nextSlide = () => {
        setCurrentSlide(prevSlide => prevSlide + 1)
    }
    console.log(currentSlide);
    console.log(sliderLength);
    return (
        <div className={'slider'}>
            {currentSlide !== 0 && <AiOutlineArrowLeft className={'arrow prev'} onClick={prevSlide}/>}
            {
                sliderData.map((slide, index) => {
                    const {image, heading, desc} = slide;
                    return <div key={index} className={index === currentSlide ? "slide current" : "slide"}>
                        {
                            index === currentSlide && (
                                <>
                                    <img src={image} alt=""/>
                                    <div className="content">
                                        <h2>{heading}</h2>
                                        <p>{desc}</p>
                                        <hr/>
                                        <a href={"#product"} className={'--btn --btn-primary'} style={{cursor: 'pointer'}}>
                                            Shop now
                                        </a>
                                    </div>
                                </>
                            )
                        }
                    </div>
                })
            }
            {currentSlide + 1 < sliderLength && <AiOutlineArrowRight className={'arrow next'} onClick={nextSlide}/>}
        </div>
    );
};

export default Slider;
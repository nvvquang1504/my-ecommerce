// Import css files
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {Navigation, Mousewheel} from "swiper";
import './style.scss';
import {useState, useEffect} from 'react';

type DetailCarouselProps = {
    imageList: string[] | undefined,
    changeBigImage: (link: string) => void,

}
const DetailCarousel = ({imageList, changeBigImage}: DetailCarouselProps) => {
    const [activeThumb, setActiveThumb] = useState<number>(0);
    useEffect(() => {
        if (imageList) {
            const url = imageList[activeThumb];
            changeBigImage(url)
        }
    }, [imageList])

    return (
        <div className={'my-swiper-container'}>
            <Swiper
                slidesPerView={4}
                direction='vertical'
                spaceBetween={20}
                navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                }}
                modules={[Navigation, Mousewheel]}
                mousewheel={true}
            >
                {
                    imageList && imageList.map((url, index) => (
                        <SwiperSlide key={index} onClick={() => {
                            setActiveThumb(index)
                            changeBigImage(url)
                        }}>
                            <div className={activeThumb == index ? 'active' : ''}>
                                <img width={50} height={50} src={url} alt=""/>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <div className={'swiper-button-prev'}></div>
            <div className={'swiper-button-next'}></div>
        </div>


    );
};

export default DetailCarousel;
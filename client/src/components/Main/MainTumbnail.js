import { useState, useEffect, useRef } from 'react';
import { IoIosArrowDropright, IoIosArrowDropleft } from 'react-icons/io';

function MainTumbnail() {
	const images = [
		`${process.env.PUBLIC_URL}/img/jungleNuNu5.jpg`,
		`${process.env.PUBLIC_URL}/img/jungleNuNu.jpg`,
		`${process.env.PUBLIC_URL}/img/jungleNuNu2.jpg`,
		`${process.env.PUBLIC_URL}/img/jungleNuNu3.jpg`,
		`${process.env.PUBLIC_URL}/img/jungleNuNu4.jpg`,
		`${process.env.PUBLIC_URL}/img/jungleNuNu6.jpg`,
	];

	const TOTAL_SLIDES = images.length - 1;
	const [currentSlide, setCurrentSlide] = useState(0);
	const slideRef = useRef(null);
	const nextSlide = () => {
		if (currentSlide >= TOTAL_SLIDES) {
			// 더이상 넘어갈 수 없으면 슬라이드 초기화
			setCurrentSlide(0);
		} else {
			setCurrentSlide(currentSlide + 1);
		}
	};
	const prevSlide = () => {
		if (currentSlide === 0) {
			setCurrentSlide(TOTAL_SLIDES);
		} else {
			setCurrentSlide(currentSlide - 1);
		}
	};

	useEffect(() => {
		slideRef.current.style.transition = 'all 0.5s ease-in-out';
		slideRef.current.style.transform = `translateX(-${currentSlide}00vw)`;
	}, [currentSlide]);
	return (
		<section className="mainThumb">
			<div className="mainThumbnail">
				<div className="slider ">
					<button type="button" onClick={nextSlide}>
						<IoIosArrowDropright className="prevBtn" />
					</button>
					<button type="button" onClick={prevSlide}>
						<IoIosArrowDropleft className="nextBtn" />
					</button>

					{/* {images.map((image) => (
						<picture ref={slideRef}>
							<img src={image} />
						</picture>
					))} */}
					<div className="sliderContainer" ref={slideRef}>
						<img src={images[0]} alt="nunu1" />
						<img src={images[1]} alt="nunu2" />
						<img src={images[2]} alt="nunu3" />
						<img src={images[3]} alt="nunu4" />
						<img src={images[4]} alt="nunu5" />
						<img src={images[5]} alt="nunu6" />
					</div>
				</div>
				<ul className="thumbnailTxt">
					<li className="topTxt"> GameStates </li>
					<li className="bottomTxt">
						Of the Gamer, By the Gamer, For the Gamer
					</li>
				</ul>
				<div className="bannerDiv">
					<div className="banner"> 배너임 </div>
				</div>
			</div>
		</section>
	);
}
export default MainTumbnail;

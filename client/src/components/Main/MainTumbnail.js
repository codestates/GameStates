function MainTumbnail() {
	const images = [
		`${process.env.PUBLIC_URL}/img/jungleNuNu.jpg`,
		`${process.env.PUBLIC_URL}/img/jungleNuNu2.jpg`,
		`${process.env.PUBLIC_URL}/img/jungleNuNu3.jpg`,
		`${process.env.PUBLIC_URL}/img/jungleNuNu4.jpg`,
		`${process.env.PUBLIC_URL}/img/jungleNuNu5.jpg`,
		`${process.env.PUBLIC_URL}/img/jungleNuNu6.jpg`,
	];

	return (
		<section className="mainThumbnail">
			{/* {images.map((image) => (
					<picture>
						<img src={image} />
					</picture>
				))} */}
			<img src={images[4]} />
			<ul className="thumbnailTxt">
				<li className="topTxt"> GameStates </li>
				<li className="bottomTxt">Of the Gamer, By the Gamer, For the Gamer</li>
			</ul>
			<div className="bannerDiv">
				<div className="banner"> 배너임 </div>
			</div>
		</section>
	);
}
export default MainTumbnail;

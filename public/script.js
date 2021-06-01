let card = document.querySelectorAll('.card');

for(let i=0;i<card.length;i++){
	card[i].addEventListener( 'click', function() {
		card[i].classList.toggle('is-flipped');
		console.log(card[i].childNodes[3].childNodes[1].childNodes[9])
	});
	if(document.getElementById(`cardOpenBack-${i+1}-mayo-2021`)){
		let openBtn = document.getElementById(`cardOpenBack-${i+1}-mayo-2021`);
		openBtn.addEventListener( 'click', function() {
			document.getElementById(`cardBackHidden-${i+1}-mayo-2021`).classList.remove('w3-hide');
			document.getElementById(`cardBackHidden-${i+1}-mayo-2021`).classList.add('tilt-in-top-1');
			console.log(`Open cardBackHidden-${i+1}-mayo-2021`);
		});
		let closeBtn = document.getElementById(`cardCloseBack-${i+1}-mayo-2021`);
		closeBtn.addEventListener( 'click', function() {
			document.getElementById(`cardBackHidden-${i+1}-mayo-2021`).classList.remove('tilt-in-top-1');
			document.getElementById(`cardBackHidden-${i+1}-mayo-2021`).classList.add('w3-hide');
			console.log(`Close cardBackHidden-${i+1}-mayo-2021`);
		});

	}
	
}






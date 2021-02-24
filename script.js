let loader = document.getElementById('loaders');
let load = function() {
	loader.style.display = 'none';
}

let url = window.location.toString();
let arr = url.split('=');
let name = arr[1];
if (name == undefined)
	name = 'AndreyIvanovNewStudent';


const getDate = new Promise((resolve, reject) => {
	setTimeout(() => {
		load();
		const dataDiv = document.createElement('div');
		dataDiv.textContent = `Текущая дата: ${Date()}`;
		document.body.append(dataDiv);
		resolve();
	}, 4000);
});
const getName = new Promise((resolve, reject) => {
	setTimeout(() => name ? resolve(name) : reject('имя не найдено'), 2000);
});

Promise.all([getDate, getName])
	.then(() => fetch(`https://api.github.com/users/${name}`))
	.then(res => res.json())
	.then(json => {
		console.log(json);

		const img = document.createElement('img');
		img.src = json.avatar_url;
		img.alt = 'Avatar';
		document.body.append(img);

		let div = document.createElement('div');
		document.body.append(div);

		let userName = document.createElement('a');
		if (json.name == null) {
			userName.textContent = 'Имя пользователя недоступно.'
		} else {
			userName.innerHTML = json.name;
			userName.href = json.html_url;
			userName.classList.add('link');
		}
		div.append(name);

		let bio = document.createElement('p');
		if (json.bio == null) {
			bio.textContent = 'Информация о пользователе недоступна.'
		} else {
			bio.textContent = json.bio;
		}
		div.append(bio);
	})
	.catch(err => console.log(err));

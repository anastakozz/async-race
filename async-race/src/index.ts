import App from './app/app';
// const baseURl = 'http://127.0.0.1:3000';

// const getCars = async () => {
//   const response = await fetch(`${baseURl}/winners`);
//   const data = await response.json();

//   console.log(data);
// };

// getCars();

const app = new App();
app.start();

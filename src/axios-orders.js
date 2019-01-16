import axios from 'axios';

const instance= axios.create({
    baseURL:'https://react-burger-builder-bdac0.firebaseio.com/'
})

export default instance;
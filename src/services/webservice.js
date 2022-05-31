import axios from 'axios';

export const tiposImoveisDisponiveisPorCidade = async (cidade) => {
    try {
        const response = await axios.get(`https://sleepy-bayou-22688.herokuapp.com/api/tiposdeimoveisdisponiveis/${cidade}`);
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const cidadesDisponiveis = async () => {
    try {
        const response = await axios.get('https://sleepy-bayou-22688.herokuapp.com/api/cidadesdisponiveis');
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const tiposdeImoveisDisponiveis = async () => {
    try {
        const response = await axios.get('https://sleepy-bayou-22688.herokuapp.com/api/tiposdeimoveisdisponiveis');
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const detalheImovel = async id => {
    try {
        const response = await axios.get(`https://sleepy-bayou-22688.herokuapp.com/api/detalheImovel/${id}`, { headers: { 'chave': 'wSK7Jlc7sQfuJ5Gx8/3v61ce5zEqL2vNNzZ8cHert2E=' } })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const filtroImovel = async (data) => {
    try {
        console.log(data)
        const { page, tipo = '', cidade = '' } = data
        let url = `https://sleepy-bayou-22688.herokuapp.com/api/imoveisDisponiveis/${page ? page : '1'}${tipo ? `/${tipo}` : cidade ? '/0' : ''}${cidade ? `/${cidade}` : ''}`
        const response = await axios.get(url);
        return response.data
    } catch (error) {
        console.log(error)
    }
}
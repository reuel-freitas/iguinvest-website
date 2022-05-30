import bc from '../pages/assets/bc.jpg'
import cs from '../pages/assets/cascavel-parana.jpg';
import cwb from '../pages/assets/curitiba.jpg';
import ita from '../pages/assets/itajai.jpg';
import itpm from '../pages/assets/itapema.jpg';


 
export default {
        getHomeCityList: () => {
            return [
                {
                    name: 'Balneario Camboriu',
                    url: bc,
                    codigo: 34
                },
                {
                    name: 'Cascavel',
                    url: cs,
                    codigo: 5
                },
                {
                    name: 'Curitiba',
                    url: cwb,
                    codigo: 9
                },
                {
                    name: 'Itajaí',
                    url: ita,
                    codigo: 21
                },
                {
                    name: 'Itapema',
                    url: itpm,
                    codigo: 29
                },
            ];
        }
    }


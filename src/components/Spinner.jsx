import { ClipLoader } from 'react-spinners';

const override = {
    display: 'block',
    margin: '0 auto',
    color: '#fff',
};

const Spinner = ({ loading }) => {
    return (
        <ClipLoader
            color='#fff'
            loading={loading}
            cssOverride={override}
            size={150}
        />
    );
};

export default Spinner;

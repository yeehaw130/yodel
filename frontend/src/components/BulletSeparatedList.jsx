import PropTypes from 'prop-types';
import { UnderText } from './CommonStyles';

const BulletSeparatedList = ({ list, under }) => {
    return (
        <div style={{paddingBottom: "20px"}}>
            {under ?
                <>
                    {list.slice(0, list.length - 1).map((it) => (
                        <UnderText key={it}>{it} • </UnderText>
                    ))}
                    <UnderText>{list[list.length - 1]}</UnderText>
                </>
                :
                <>
                    {list.slice(0, list.length - 1).map((it) => (
                        <span key={it}>{it} • </span>
                    ))}
                    <span>{list[list.length - 1]}</span>
                </>
            }
        </div>
    );
}

BulletSeparatedList.propTypes = {
    list: PropTypes.array.isRequired,
    under: PropTypes.bool,
};

export default BulletSeparatedList;
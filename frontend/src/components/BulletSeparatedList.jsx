import PropTypes from 'prop-types';
import { UnderText } from './CommonStyles';

const BulletSeparatedList = ({ list, under, style }) => {
    return (
        <div style={{paddingBottom: "20px", paddingTop: "20px", ...style}}>
            {under ?
                <>
                    {list.slice(0, list.length - 1).map((it, i) => (
                        <UnderText key={i}>{it} • </UnderText>
                    ))}
                    <UnderText>{list[list.length - 1]}</UnderText>
                </>
                :
                <>
                    {list.slice(0, list.length - 1).map((it, i) => (
                        <span key={i}>{it} • </span>
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
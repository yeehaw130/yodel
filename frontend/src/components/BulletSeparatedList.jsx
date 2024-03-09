import PropTypes from 'prop-types';

const BulletSeparatedList = ({list}) => {
    return (
        <p>
            {list.slice(0, list.length - 1).map((it) => (
                <span key={it}>{it} • </span>
            ))}
            <span>{list[list.length - 1]}</span>
        </p>
    );
}

BulletSeparatedList.propTypes = {
    list: PropTypes.array.isRequired,
};

export default BulletSeparatedList;
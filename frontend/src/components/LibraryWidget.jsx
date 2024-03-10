/* eslint-disable react/prop-types */
import { Widget, SubtitleText } from "./CommonStyles";
import BulletSeparatedList from "./BulletSeparatedList";

const LibraryIcon = ({ icon, children }) => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "20px 20px 10px 20px",
        }}>
            <img src={icon} alt={children} />
            <SubtitleText style={{ paddingLeft: "25px" }}> {children} </SubtitleText>
        </div>
    );

}

const LibraryList = ({ entries: libraryEntries }) => {
    return (
        <ul style={{ listStyleType: "none", paddingTop: "0px" }}>
            {libraryEntries.map((entry, i) => (
                <li key={i}>
                    <LibraryEntry entry={entry} />
                </li>
            ))}
        </ul>
    );
}

const LibraryEntry = ({ entry: entry }) => {
    return (
        <div style={{ display: "flex" }}>
            <img
                src={entry.cover}
                alt={entry.title}
                width="70px"
                height="70px"
                style={{ borderRadius: "10%", marginRight: "15px" }}
            />
            <div>
                <span style={{
                    maxWidth: "13ch",
                    textOverflow: "ellipsis",
                    fontSize: "20px",
                }}>
                    {entry.title}
                </span>
                <BulletSeparatedList
                    list={[
                        entry.createdBy.username,
                        entry.songs.length + ' songs'
                    ]}
                    under
                />
            </div>
        </div>
    );
}

const LibraryWidget = ({ playlists }) => {
    return (
        <Widget style={{
            padding: "0px",
            paddingRight: "5px",
            overflow: "auto",
            height: "79vh",
        }}>
            <div style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: "0px 15px 0px 15px",
            }}>
                <LibraryIcon icon="../../img/bookshelf.svg">Library</LibraryIcon>
                <div style={{ flex: 1 }}></div>
                <SubtitleText style={{ fontSize: 35 }}> + </SubtitleText>
            </div>
            <LibraryList entries={playlists} />
        </Widget>
    );
};

export default LibraryWidget;
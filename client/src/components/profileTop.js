function getAccountAge(creationDate) {
    const currentDate = new Date();
    const accountCreationDate = new Date(creationDate);

    const ageInMilliseconds = currentDate - accountCreationDate;
    const ageInSeconds = Math.floor(ageInMilliseconds / 1000);
    const ageInMinutes = Math.floor(ageInSeconds / 60);
    const ageInHours = Math.floor(ageInMinutes / 60);
    const ageInDays = Math.floor(ageInHours / 24);
    const ageInYears = Math.floor(ageInDays / 365);

    if (ageInYears > 0) {
        return `${ageInYears} year(s) and ${ageInDays % 365} day(s) and ${ageInHours % 24} hours(s) and ${ageInMinutes % 60} minutes and ${ageInSeconds % 60} second(s)`;
    } else if (ageInDays > 0) {
        return `${ageInDays} day(s) and ${ageInHours % 24} hours(s) and ${ageInMinutes % 60} minutes and ${ageInSeconds % 60} second(s)`;
    } else if (ageInHours > 0) {
        return `${ageInHours} hour(s) and ${ageInMinutes % 60} minute(s) and ${ageInSeconds % 60} second(s)`;
    } else if (ageInMinutes > 0) {
        return `${ageInMinutes} minute(s) and ${ageInSeconds % 60} second(s)`;
    } else {
        return `${ageInSeconds} second(s)`;
    }
}

export default function profileTop(props){
    return <div id = "profile-top" className = "bottomBorder">
        <span>Username: {props.user.username}</span>
        <span>Reputation: {props.user.reputation}</span>
        <span>Account age: {getAccountAge(props.user.createdDate)}</span>
    </div>
}
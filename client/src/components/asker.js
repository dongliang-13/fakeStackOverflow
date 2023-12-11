function getPostTime(date) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentDate = new Date();
    date = new Date(date);
    if (date.getFullYear() !== currentDate.getFullYear()) {
        return (
            <span>
                {monthNames[date.getMonth()]} {date.getDate()}, {date.getFullYear()} at {' '}
                {`${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`}
            </span>
        );
    } 
    else if (date.getMonth() !== currentDate.getMonth() || date.getDate() !== currentDate.getDate()) {
        return (
            <span>
                {monthNames[date.getMonth()]} {date.getDate()} at {' '}
                {`${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`}
            </span>
        );
    }
    else{
        const differenceInSecond = 3600*(currentDate.getHours()-date.getHours()) + 
            60*(currentDate.getMinutes() - date.getMinutes()) + 
            (currentDate.getSeconds() - date.getSeconds());
        if(differenceInSecond >= 3600){
            return <span>{Math.floor(differenceInSecond/3600)} hours ago</span>;
        }
        else if(differenceInSecond >= 60){
            return <span>{Math.floor(differenceInSecond/60)} minutes ago</span>;
        }
        else if (differenceInSecond >= 1){
            return <span>{Math.floor(differenceInSecond)} seconds ago</span>;
        }
        else{
            return <span>0 seconds ago</span>;
        }
    }
}

export default function Asker(props){
    return (
        <div className = "asker">
            <span style = {{color: props.color}}>{props.name}</span>
            <span className = "timeInfo">{' '}{props.action} {getPostTime(props.date)}</span>
        </div>
    )
}
const Part = ({ name, exercises }) => {
    return (
        <div>
            <h3>{name}</h3>
            <p>Exercises: {exercises}</p>
        </div>
    );
};

export default Part;

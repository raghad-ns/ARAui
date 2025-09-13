import { IPatient } from '../../types/patient.type';
import './table.css';
interface IProps {
    records: IPatient[];
}
const Table = (props: IProps) => {
    const records = props.records;
    return (
        <div className="table-wrapper">
            <table className="fl-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>BMI</th>
                        <th>diagnose</th>
                        <th>notes</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record, index) =>
                        <tr key={index}>
                            {Object.entries(record).map(([key, value]) => <td key={key + index}>{value}</td>)}
                        </tr>)}

                </tbody>
            </table>
        </div>
    );
}

export default Table;

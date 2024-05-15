import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { ColumnDefinition } from '../Types/ColumnDefinition';
import { isNil } from 'lodash';

type Props = {
    columns: ColumnDefinition[];
    data: any[];
};

function DataTable({ columns, data }: Props){
    return (
        <Table>
            <TableHead>
                <TableRow>
                    {
                        columns.map(column =>
                            <TableCell key={ column.header }>
                                <b>
                                    { column.header }
                                </b>
                            </TableCell>
                        )
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    data.map((row, index) => 
                        <TableRow key={ index }>
                            {
                                columns.map(column =>
                                    <TableCell key={ column.header }>
                                        { isNil(column.formatter) ? row[column.accessor] : column.formatter(row[column.accessor]) }
                                    </TableCell>
                                )
                            }
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    );
}

export default DataTable;

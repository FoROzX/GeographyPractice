import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

type Props = {
    name: string;
    label: string;
    onChange: (e: SelectChangeEvent) => void;
    value?: any;
    multiple?: boolean;
    options: { valueMember: any; displayMember: string }[];
};

function SelectFormItem({ name, label, onChange, value, multiple, options }: Props){
    return (
        <FormControl>
            <InputLabel
                id={`${name}-select-label`}
            >
                { label }
            </InputLabel>
            <Select
                multiple={ multiple }
                value={ value }
                onChange={ onChange }
                labelId={`${name}-select-label`}
                label={ label }
                sx={{ width: 200 }}
            >
                {
                    options.map((option, index) =>
                        <MenuItem key={ index } value={ option.valueMember }>{ option.displayMember }</MenuItem>
                    )
                }
            </Select>
        </FormControl>
    );
}

export default SelectFormItem;
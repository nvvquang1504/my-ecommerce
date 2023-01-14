import {Paper, Grid, Container, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import {ComponentType} from "react";


export const withFilter = (Component: ComponentType): ComponentType => {
    return (props: any) => {
        return <Container maxWidth={'lg'} style={{marginTop: '1rem'}}>
            <div className={'with-filter-layout'}>
                <Grid container>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper>
                            <FormControl sx={{m: 1, minWidth: 120}} size="small">
                                <Select
                                    id="select-filter"
                                    // onChange={handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Paper>
                        <Component {...props}/>
                    </Grid>
                </Grid>
            </div>
        </Container>
    }
}


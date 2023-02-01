import './styles.scss';
import {Link} from "react-router-dom";
import {HiShoppingCart} from "react-icons/hi";
import { useState, MouseEvent} from "react";
import {Box, Popover, Stack, Typography} from "@mui/material";

const CartPopover = ({cartList}: { cartList: any[] | null }): JSX.Element => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const handleMouseEnter = (event: MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget);
    }
    const handleMouseLeave = (): void => {
        setAnchorEl(null);
    }
    const open = Boolean(anchorEl);
    return (
        <div className={'cart'}>
            <Link aria-owns={open ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true" to={'/cart'} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                Cart
                <HiShoppingCart size={20}/>
                <p>{cartList?.length}</p>
            </Link>
            <Popover
                id="mouse-over-popover"
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                sx={{
                    pointerEvents: 'none',
                }}
            >
                <Box
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    flexDirection={'column'}
                >
                    <Typography>Recently added product</Typography>
                    <Stack>
                        <div>
                            <img width={50} height={50} src={cartList ? cartList[0].image : undefined} alt=""/>
                        </div>
                        <Typography></Typography>
                    </Stack>
                </Box>
            </Popover>
        </div>
    );
};

export default CartPopover;
import React, { useMemo } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
	AppBar,
	Box,
	Toolbar,
	InputBase,
	Button,
	Typography,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import Image from "next/image";

const toddle_logo = `/toddle_logo.svg`;
const toddle_name = `/toddle_name.svg`;

const Search = styled("div")(({ theme }) => ({
	borderRadius: "5px",
	border: "1px solid #EBEBEB",
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "284px",
	height: "40px",
	display: "flex",
	alignItems: "center",
	gap: "0px",
	padding: "13px 16px",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	height: "100%",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}));

export default function PrimarySearchAppBar({
	onClick,
}: {
	onClick: () => void;
}) {
	const theme = useTheme();

	const { appBarLayout } = useMemo(
		() => ({
			appBarLayout: {
				borderBottom: "1px solid #EBEBEB",
				padding: "0px 48px",
			},
		}),
		[]
	);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" sx={appBarLayout} elevation={0}>
				<Toolbar>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: "6.51px",
						}}
					>
						<Image
							src={toddle_logo}
							alt="toddle_logo"
							width={30.73}
							height={31.83}
						/>
						<Image
							src={toddle_name}
							alt="toddle_name"
							width={58.23}
							height={14.99}
						/>
					</Box>
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: "flex", gap: "80px" }}>
						<Search>
							<SearchIconWrapper>
								<SearchIcon />
							</SearchIconWrapper>
							<StyledInputBase
								placeholder="Search…"
								inputProps={{ "aria-label": "search" }}
							/>
						</Search>
						<Button
							variant="contained"
							color="error"
							disableElevation={true}
							sx={{
								textTransform: "none",
								gap: "10px",
								borderRadius: "8px",
							}}
							onClick={onClick}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="21"
								height="20"
								viewBox="0 0 21 20"
								fill="none"
							>
								<path
									d="M11.125 2.5C11.125 2.15482 10.8452 1.875 10.5 1.875C10.1548 1.875 9.875 2.15482 9.875 2.5V9.375H3C2.65482 9.375 2.375 9.65482 2.375 10C2.375 10.3452 2.65482 10.625 3 10.625H9.875V17.5C9.875 17.8452 10.1548 18.125 10.5 18.125C10.8452 18.125 11.125 17.8452 11.125 17.5V10.625H18C18.3452 10.625 18.625 10.3452 18.625 10C18.625 9.65482 18.3452 9.375 18 9.375H11.125V2.5Z"
									fill="white"
								/>
							</svg>
							<Typography
								variant="body2"
								sx={{
									fontWeight: 700,
									letterSpacing: "0.03em",
								}}
							>
								Create new board
							</Typography>
						</Button>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

interface Post {
	subject: string;
	imageUrl: string;
	description: string;
}

interface Board {
	id: number;
	title: string;
	color: string;
	posts: Post[];
}

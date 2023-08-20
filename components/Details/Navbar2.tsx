import React, { useMemo, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
	AppBar,
	Box,
	Toolbar,
	InputBase,
	Typography,
	IconButton,
	Fade,
} from "@mui/material";
import {
	Search as SearchIcon,
	ArrowBackIosNew,
	BookmarkBorderOutlined,
} from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/router";

const toddle_logo = `/toddle_logo.svg`;

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

export default function Navbar2({ title }: { title: string }) {
	const theme = useTheme();
	const router = useRouter();

	const { appBarLayout } = useMemo(
		() => ({
			appBarLayout: {
				borderBottom: "1px solid #EBEBEB",
				padding: "0px 27.5px",
			},
		}),
		[]
	);

	const [expand, setExpand] = useState(false);
	const expandSearch = () => {
		setExpand(!expand);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" sx={appBarLayout} elevation={0}>
				<Toolbar>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
						}}
					>
						<IconButton
							onClick={() => {
								router.back();
							}}
						>
							<ArrowBackIosNew />
						</IconButton>
						<Image
							src={toddle_logo}
							alt="toddle_logo"
							width={30.73}
							height={31.83}
							style={{ marginRight: "16.85px" }}
						/>
						<Typography variant="h5">{title}</Typography>
					</Box>
					<Box sx={{ flexGrow: 1 }} />
					<Box
						sx={{
							display: "inline-flex",
							alignItems: "center",
							gap: "5px",
							color: "#828282",
						}}
					>
						{expand ? (
							<Fade in={expand}>
								<Search>
									<SearchIconWrapper>
										<SearchIcon />
									</SearchIconWrapper>
									<StyledInputBase
										placeholder="Search…"
										inputProps={{ "aria-label": "search" }}
									/>
								</Search>
							</Fade>
						) : null}
						<IconButton onClick={expandSearch}>
							<SearchIcon />
						</IconButton>
						<Typography sx={{ fontWeight: 900, fontSize: "20px" }}>
							|
						</Typography>
						<IconButton>
							<BookmarkBorderOutlined />
						</IconButton>
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

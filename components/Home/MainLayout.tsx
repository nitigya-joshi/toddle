import {
	Box,
	Typography,
	useMediaQuery,
	Button,
	Menu,
	MenuItem,
	Modal,
	TextField,
	IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useMemo, useState } from "react";
import {
	MoreVert,
	BorderColorOutlined,
	DeleteOutlined,
	Close,
} from "@mui/icons-material";
import Navbar from "./Navbar";
import Link from "next/link";

const colors = [
	"var(--blue-90, #CAF8FF)",
	"var(--yellow-70, #FC6);",
	"var(--violet-80, #C5C5FC);",
	"var(--pink-70, #FFAEC0)",
];

export default function MainLayout() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const {
		mainLayoutStyle,
		boardLayout,
		singleBoardLayout,
		boardDetailsstyle,
		modalBoxStyle,
		modalStyle,
	} = useMemo(
		() => ({
			mainLayoutStyle: {
				padding: "30px 60px",
				[theme.breakpoints.down("sm")]: {
					padding: "30px 10px",
				},
			},

			boardLayout: {
				display: "flex",
				flexWrap: "wrap",
				justifyContent: isMobile ? "center" : "",
				gap: "20px",
				marginTop: "25px",
			},

			singleBoardLayout: {
				width: "364px",
				height: "80px",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				textAlign: "left",
				borderRadius: "8px",
				paddingRight: "10px",
				border: "1px solid var(--border-border-subtle, #EBEBEB)",
			},

			boardDetailsstyle: {
				width: "80px",
				height: "80px",
				borderRadius: "8px 0 0 8px",
			},

			modalBoxStyle: {
				position: "absolute" as "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				bgcolor: theme.palette.background.default,
				border: "1px solid var(--border-border-subtle, #EBEBEB)",
				boxShadow: 24,
				p: 4,
				borderRadius: "8px",
				padding: "20px 20px",
				maxWidth: "458px",
				width: "100%",
				height: "364px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
			},
			modalStyle: {
				"& .MuiModal-backdrop": {
					backgroundColor: theme.palette.text.disabled,
				},
			},
		}),
		[isMobile, theme]
	);

	const [boards, setBoards] = useState<Board[]>([]);
	const [selectedColor, setSelectedColor] = useState<string>(colors[0]);
	const [boardTitle, setBoardTitle] = useState<string>("");
	const [selectedBoard, setSelectedBoard] = useState<Board>({} as Board);
	const [open, setOpen] = React.useState(false);
	const [editClicked, setEditClicked] = useState<boolean>(false);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const openDropdown = Boolean(anchorEl);

	const handleClickDropdown = (
		event: React.MouseEvent<HTMLElement>,
		{
			boardId,
			boardTitle,
			boardColor,
		}: { boardId: number; boardTitle: string; boardColor: string }
	) => {
		setAnchorEl(event.currentTarget);
		setSelectedBoard({
			id: boardId,
			title: boardTitle,
			color: boardColor,
			posts: selectedBoard.posts,
		});
	};
	const handleCloseDropdown = () => {
		setAnchorEl(null);
		setSelectedBoard({} as Board);
	};

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleColorClick = (color: string) => {
		setSelectedColor(color);
	};

	const saveBoardsToLocalStorage = (updatedBoards: Board[]) => {
		localStorage.setItem("boards", JSON.stringify(updatedBoards));
		setBoards(updatedBoards);
	};

	const handleCreate = () => {
		const timestamp = new Date().getTime();
		const newBoard: Board = {
			id: timestamp,
			title: boardTitle,
			color: selectedColor,
			posts: [],
		};
		const updatedBoards = [...boards, newBoard];
		setBoards(updatedBoards);
		saveBoardsToLocalStorage(updatedBoards);
		setBoardTitle("");
		setSelectedColor(colors[0]);
		handleClose();
	};

	const handleDelete = () => {
		if (selectedBoard && boards) {
			const updatedBoards = boards.filter(
				(board) => board.id !== selectedBoard.id
			);
			setBoards(updatedBoards);
			saveBoardsToLocalStorage(updatedBoards);
		} else {
			console.error("boards is empty. no data there to delete");
		}
	};

	const handleEdit = () => {
		setEditClicked(true);
		setSelectedBoard({
			id: selectedBoard.id,
			title: selectedBoard.title,
			color: selectedBoard.color,
			posts: selectedBoard.posts,
		});
		setBoardTitle(selectedBoard.title);
		setSelectedColor(selectedBoard.color);
		setOpen(true);
	};

	const handleUpdates = () => {
		let updatedBoards = boards.map((board) => {
			if (board.id === selectedBoard.id) {
				return {
					...board,
					title: boardTitle,
					color: selectedColor,
				};
			}
			return board;
		});
		saveBoardsToLocalStorage(updatedBoards);
		setBoards(updatedBoards);

		handleClose();
		setEditClicked(false);
		setBoardTitle("");
		setSelectedColor(colors[0]);
	};

	useEffect(() => {
		const storedBoards = localStorage.getItem("boards");
		if (storedBoards) {
			setBoards(JSON.parse(storedBoards));
		}
	}, []);

	return (
		<>
			<Navbar onClick={handleOpen} />
			<Box sx={mainLayoutStyle}>
				<Typography variant="h2">My boards</Typography>
				{boards && (
					<Box sx={boardLayout}>
						{boards.map((board) => (
							<Box sx={singleBoardLayout} key={board.id}>
								<Link
									href={`${board.id}`}
									style={{
										width: "100%",
										height: "80px",
										display: "flex",
										gap: "24px",
										textDecoration: "none",
										alignItems: "center",
									}}
									passHref
								>
									<Box
										sx={{
											...boardDetailsstyle,
											background: board.color,
										}}
									></Box>
									<Typography variant="body2">
										{board.title}
									</Typography>
								</Link>
								<IconButton
									id="demo-positioned-button"
									aria-controls={
										openDropdown
											? "demo-positioned-menu"
											: undefined
									}
									aria-haspopup="true"
									aria-expanded={
										openDropdown ? "true" : undefined
									}
									onClick={(e) =>
										handleClickDropdown(e, {
											boardId: board.id,
											boardTitle: board.title,
											boardColor: board.color,
										})
									}
								>
									<MoreVert style={{ color: "black" }} />
								</IconButton>
							</Box>
						))}
					</Box>
				)}
			</Box>
			<Menu
				id="demo-positioned-menu"
				aria-labelledby="demo-positioned-button"
				anchorEl={anchorEl}
				open={openDropdown}
				onClose={handleCloseDropdown}
				anchorOrigin={{
					vertical: 35,
					horizontal: 30,
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				elevation={0}
				sx={{
					"& .MuiPaper-root": {
						border: "1px solid var(--border-border-subtle, #EBEBEB)",
						background: "var(--surface-white-surface-white, #FFF)",
						boxShadow: `0px 5px 10px 0px rgba(0, 46, 57, 0.15)`,
						borderRadius: "8px",
						width: "149px",
						height: "auto",
					},
					"& .MuiMenuItem-root": {
						width: "100%",
						height: "50px",
						display: "flex",
						gap: "10px",
					},
				}}
			>
				<MenuItem
					onClick={() => {
						handleCloseDropdown();
						handleEdit();
					}}
					sx={{
						color: theme.palette.text.secondary,
					}}
				>
					<BorderColorOutlined />
					Edit
				</MenuItem>
				<MenuItem
					onClick={() => {
						handleDelete();
						handleCloseDropdown();
					}}
					sx={{
						color: theme.palette.error.main,
					}}
				>
					<DeleteOutlined />
					Delete
				</MenuItem>
			</Menu>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				sx={modalStyle}
			>
				<Box sx={modalBoxStyle}>
					<Box>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Typography
								id="modal-modal-title"
								variant="h4"
								component="h2"
							>
								Add a name for your board
							</Typography>
							<IconButton onClick={handleClose}>
								<Close />
							</IconButton>
						</Box>
						<TextField
							id="outlined-basic"
							variant="outlined"
							size="small"
							fullWidth={true}
							sx={{
								marginTop: "16px",
								marginBottom: "40px",
								"& input": {
									fontSize: 16,
									fontWeight: 500,
								},
							}}
							placeholder="Board name"
							InputProps={{
								inputProps: {
									minLength: 2,
								},
							}}
							defaultValue={boardTitle}
							onChange={(e) => {
								if (e.target.value.length >= 3) {
									setBoardTitle(e.target.value);
								}
							}}
						/>
					</Box>

					<Box sx={{ marginRight: "2px" }}>
						<Typography variant="h4">Select post colour</Typography>
						<Typography variant="body3">
							Here are some templates to help you get started
						</Typography>
						<Box
							sx={{
								display: "flex",
								gap: "10px",
								marginTop: "16px",
							}}
						>
							{colors.map((color) => (
								<Box
									key={color}
									onClick={() => handleColorClick(color)}
									sx={{
										width: "24px",
										height: "24px",
										borderRadius: "50%",
										backgroundColor: color,
										border:
											selectedColor === color
												? "1.5px solid var(--teal-40, #23856D)"
												: "none",
										cursor: "pointer",
									}}
								/>
							))}
						</Box>
					</Box>

					<Box
						sx={{
							marginTop: "70px",
							display: "flex",
							justifyContent: "flex-end",
						}}
					>
						{editClicked ? (
							<Button
								variant="contained"
								color="error"
								disableElevation={true}
								sx={{
									textTransform: "none",
									borderRadius: "8px",
									letterSpacing: "0.03em",
								}}
								onClick={handleUpdates}
							>
								<Typography variant="body1">
									Update board
								</Typography>
							</Button>
						) : (
							<Button
								variant="contained"
								color="error"
								disableElevation={true}
								sx={{
									textTransform: "none",
									borderRadius: "8px",
									letterSpacing: "0.03em",
								}}
								onClick={handleCreate}
							>
								<Typography variant="body1">
									Create board
								</Typography>
							</Button>
						)}
					</Box>
				</Box>
			</Modal>
		</>
	);
}

interface Post {
	id: number;
	createdAt: string;
	subject: string;
	imageUrl: string;
	description: string;
	likes: number;
}

interface Board {
	id: number;
	title: string;
	color: string;
	posts: Post[];
}

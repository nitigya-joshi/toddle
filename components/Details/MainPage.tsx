import React, { useEffect, useMemo, useState } from "react";
import {
	Box,
	Button,
	Divider,
	IconButton,
	Menu,
	MenuItem,
	Modal,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import Navbar2 from "@/components/Details/Navbar2";
import { useRouter } from "next/router";
import Image from "next/image";
import {
	BookmarkBorderOutlined,
	Close,
	MoreVert,
	FavoriteBorder,
	BorderColorOutlined,
	DeleteOutlined,
	AddBoxOutlined,
} from "@mui/icons-material";
import { randomInt } from "crypto";
import { set } from "mongoose";
const empty_board = `/empty_board.svg`;

export default function MainPage() {
	const theme = useTheme();
	const router = useRouter();
	let { boardId } = router.query;
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const [board, setBoard] = useState<Board>();
	const [boards, setBoards] = useState<Board[]>([] as Board[]);

	const {
		detailsLayout,
		modalStyle,
		modalBoxStyle,
		postLayout,
		singlePostStyle,
		likeSection,
	} = useMemo(
		() => ({
			detailsLayout: {
				backgroundColor: board?.color,
				minHeight: "90.8vh",
				padding: "19px 29px 19px 48px",
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
				height: "530px",
				flexShrink: 0,
			},
			modalStyle: {
				"& .MuiModal-backdrop": {
					backgroundColor: theme.palette.text.disabled,
				},
			},
			postLayout: {
				display: "flex",
				flexWrap: "wrap",
				justifyContent: isMobile ? "center" : "",
				gap: "40px",
				marginTop: "25px",
			},

			singlePostStyle: {
				width: "290px",
				height: "577px",
				padding: "16px",
				borderRadius: "8px",
				display: "flex",
				flexDirection: "column",
				gap: "16px",
				backgroundColor: theme.palette.background.default,
			},

			likeSection: {
				display: "flex",
				gap: "3px",
				color: theme.palette.text.secondary,
			},
		}),
		[board?.color, theme, isMobile]
	);

	const [posts, setPosts] = useState<Post[]>([]);
	const [postSubject, setPostSubject] = useState<string>("");
	const [postImg, setPostImg] = useState<string>("");
	const [postDescr, setPostDescr] = useState<string>("");
	const [selectedPost, setSelectedPost] = useState<Post>({} as Post);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const openDropdown = Boolean(anchorEl);

	const handleClickDropdown = (
		event: React.MouseEvent<HTMLElement>,
		{
			postId,
			postSubject,
			postImg,
			postDescr,
		}: {
			postId: number;
			postSubject: string;
			postImg: string;
			postDescr: string;
		}
	) => {
		setAnchorEl(event.currentTarget);
		setSelectedPost({
			id: postId,
			subject: postSubject,
			imageUrl: postImg,
			description: postDescr,
		} as Post);
	};
	const handleCloseDropdown = () => {
		setAnchorEl(null);
		setSelectedPost({} as Post);
	};

	const [open, setOpen] = useState(false);
	const [editClicked, setEditClicked] = useState<boolean>(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	useEffect(() => {
		let storedBoards = JSON.parse(localStorage.getItem("boards") || "[]");
		setBoards(storedBoards);

		if (storedBoards) {
			let curBoard = storedBoards?.find((board: Board) => {
				return board.id === parseInt(boardId as string);
			});
			setBoard(curBoard);
			setPosts(curBoard?.posts);
		}
	}, [boardId]);

	const saveBoardToLocalStorage = (updatedBoards: Board[]) => {
		localStorage.setItem("boards", JSON.stringify(updatedBoards));
		setBoards(updatedBoards);
	};

	const handleCreate = () => {
		const timestamp = new Date().getTime();
		const newPost: Post = {
			id: timestamp,
			createdAt: dateFunction(),
			subject: postSubject,
			imageUrl: postImg,
			description: postDescr,
			likes: Math.floor(Math.random() * 100) + 1,
		};
		const updatedPosts = [...posts, newPost];
		setPosts(updatedPosts);
		const updatedBoards = boards.map((board: Board) => {
			if (board.id === parseInt(boardId as string)) {
				board.posts = updatedPosts;
			}
			return board;
		});
		saveBoardToLocalStorage(updatedBoards);
		console.log(updatedBoards);
		setPostSubject("");
		setPostImg("");
		setPostDescr("");
		handleClose();
	};

	const handleDelete = () => {
		const updatedPosts = posts.filter(
			(post) => post.id !== selectedPost.id
		);

		setPosts(updatedPosts);
		const updatedBoards = boards.map((board) => {
			if (board.id === parseInt(boardId as string)) {
				board.posts = updatedPosts;
			}
			return board;
		});
		saveBoardToLocalStorage(updatedBoards);
	};

	const handleEdit = () => {
		setEditClicked(true);
		setSelectedPost({
			...selectedPost,
			subject: selectedPost.subject,
			imageUrl: selectedPost.imageUrl,
			description: selectedPost.description,
		});
		setPostSubject(selectedPost.subject);
		setPostImg(selectedPost.imageUrl);
		setPostDescr(selectedPost.description);
		setOpen(true);
	};

	const handleUpdates = () => {
		const updatedPosts = posts.map((post) => {
			if (post.id === selectedPost.id) {
				post.subject = postSubject;
				post.imageUrl = postImg;
				post.description = postDescr;
			}
			return post;
		});
		setPosts(updatedPosts);
		const updatedBoards = boards.map((board) => {
			if (board.id === parseInt(boardId as string)) {
				board.posts = updatedPosts;
			}
			return board;
		});
		saveBoardToLocalStorage(updatedBoards);
		setPostSubject("");
		setPostImg("");
		setPostDescr("");
		handleClose();
		setEditClicked(false);
	};

	const dateFunction = () => {
		const currentDate = new Date();
		const day = currentDate.getDate();
		const month = currentDate.toLocaleString("en-US", { month: "long" });
		const year = currentDate.getFullYear();
		const formattedDate = `${day}${
			day > 3 ? "th" : day === 2 ? "nd" : day === 1 ? "st" : "rd"
		} ${month}, ${year}`;
		return formattedDate;
	};

	if (!board) {
		return (
			<Box>
				<Navbar2 title="Page not found" />
				<Box> Error 404: Page not found</Box>
			</Box>
		);
	} else {
		return (
			<>
				<Box sx={{ height: "100%" }}>
					<Navbar2 title={board.title} />
					<Box sx={detailsLayout}>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<Typography variant="h2">Your posts</Typography>
							<Button
								variant="contained"
								color="error"
								disableElevation={true}
								sx={{
									textTransform: "none",
									gap: "10px",
									borderRadius: "8px",
								}}
								onClick={handleOpen}
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
									Create new post
								</Typography>
							</Button>
						</Box>
						{posts && posts.length > 0 ? (
							<Box sx={postLayout}>
								{posts.map((post: Post) => (
									<Box sx={singlePostStyle} key={post.id}>
										<Box>
											<Box
												sx={{
													height: "auto",
													display: "flex",
													justifyContent:
														"space-between",
												}}
											>
												<Box
													sx={{
														display: "flex",
														gap: "10px",
													}}
												>
													<Typography variant="h4">
														{post.subject}
													</Typography>
												</Box>
												<Box
													sx={{
														width: "43px",
														display: "flex",
														color: theme.palette
															.text.secondary,
													}}
												>
													<BookmarkBorderOutlined />
													<Box
														onClick={(e) =>
															handleClickDropdown(
																e,
																{
																	postId: post.id,
																	postSubject:
																		post.subject,
																	postImg:
																		post.imageUrl,
																	postDescr:
																		post.description,
																}
															)
														}
														sx={{
															cursor: "pointer",
														}}
													>
														<MoreVert
															style={{
																color: theme
																	.palette
																	.text
																	.secondary,
															}}
														/>
													</Box>
												</Box>
											</Box>
											<Typography variant="body4">
												{post.createdAt}
											</Typography>
										</Box>
										<Image
											src={post.imageUrl}
											alt="post_image"
											width={257}
											height={162}
											style={{
												borderRadius: "8px",
												objectFit: "cover",
											}}
										/>
										<Box
											sx={{
												height: "240px",
												overflow: "auto",
											}}
										>
											<Typography variant="body3">
												{post.description}
											</Typography>
										</Box>
										<Divider />
										<Box sx={likeSection}>
											<FavoriteBorder />
											<Typography variant="body1">
												{post.likes}
											</Typography>
										</Box>
									</Box>
								))}
							</Box>
						) : (
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
									height: "90%",
									gap: "5px",
								}}
							>
								<Image
									src={empty_board}
									alt="empty_board"
									width={215}
									height={215}
								/>
								<Typography
									variant="body1"
									sx={{ fontWeight: 700 }}
								>
									Nothing here yet
								</Typography>
								<Typography
									variant="body2"
									sx={{ fontWeight: 400 }}
								>
									Create your first post by clicking on the
									&apos;+&apos; button above
								</Typography>
							</Box>
						)}
					</Box>
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
							background:
								"var(--surface-white-surface-white, #FFF)",
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
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "space-between",
								height: "240px",
							}}
						>
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
										Create a post
									</Typography>
									<IconButton
										size="small"
										onClick={handleClose}
									>
										<Close />
									</IconButton>
								</Box>
								<Typography variant="body2">
									Write something for your post
								</Typography>
							</Box>

							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-between",
									height: "60%",
									marginTop: "30px",
								}}
							>
								<Typography variant="body1">Subject</Typography>
								<TextField
									defaultValue={postSubject}
									id="outlined-basic"
									variant="outlined"
									size="small"
									fullWidth={true}
									sx={{
										"& input": {
											fontSize: 16,
											fontWeight: 400,
										},
									}}
									placeholder="Post subject"
									InputProps={{
										inputProps: {
											minLength: 2,
										},
									}}
									onChange={(e) => {
										if (e.target.value.length >= 3) {
											setPostSubject(e.target.value);
										}
									}}
								/>
								<TextField
									defaultValue={postImg}
									id="outlined-basic"
									variant="outlined"
									size="small"
									fullWidth={true}
									sx={{
										"& input": {
											fontSize: 16,
											fontWeight: 300,
										},
									}}
									placeholder="Add your image url"
									InputProps={{
										inputProps: {
											minLength: 2,
										},
									}}
									onChange={(e) => {
										if (e.target.value.length >= 3) {
											setPostImg(e.target.value);
										}
									}}
								/>
							</Box>
						</Box>
						<Divider sx={{ margin: "20px 0 31px 0" }} />
						<Box>
							<Typography
								variant="body1"
								sx={{ marginBottom: "10px" }}
							>
								What’s on your mind?{" "}
							</Typography>
							<TextField
								defaultValue={postDescr}
								id="outlined-basic"
								variant="outlined"
								size="small"
								fullWidth={true}
								placeholder="Type here"
								InputProps={{
									inputProps: {
										minLength: 2,
										style: {
											fontSize: 14,
											fontWeight: 400,
										},
									},
								}}
								onChange={(e) => {
									if (e.target.value.length >= 3) {
										setPostDescr(e.target.value);
									}
								}}
								multiline
								rows={3}
							/>
						</Box>

						<Box
							sx={{
								marginTop: "40px",
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
										Update post
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
										Publish
									</Typography>
								</Button>
							)}
						</Box>
					</Box>
				</Modal>
			</>
		);
	}
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

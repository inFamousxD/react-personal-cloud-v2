import * as React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@mui/material/SvgIcon';
import clsx from 'clsx';
import StyledSpeedDial from './StyledSpeedDial';
import TaskSpeedDial from './TasksSpeedDial';
import { treeItemClasses } from '@mui/lab/TreeItem';
import { alpha, styled } from '@mui/material/styles';
import { useTreeItem, TreeView, TreeItem } from '@mui/lab';
import { useSpring, animated } from 'react-spring';
import { Typography, Collapse } from '@mui/material';
import { Box } from '@mui/system';

const CustomContent = React.forwardRef(function CustomContent(props, ref) {
  const {
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (event) => {
    preventSelection(event);
  };

  const handleExpansionClick = (event) => {
    handleExpansion(event);
  };

  const handleSelectionClick = (event) => {
    handleSelection(event);
  };

  return (
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onMouseDown={handleMouseDown}
      ref={ref}
    >
      <div onClick={handleExpansionClick} className={classes.iconContainer}>
        {icon}
      </div>
      <Typography
        onClick={handleSelectionClick}
        component="div"
        className={classes.label}
      >
        {label}
      </Typography>
    </div>
  );
});

CustomContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  displayIcon: PropTypes.node,
  expansionIcon: PropTypes.node,
  icon: PropTypes.node,
  label: PropTypes.node,
  nodeId: PropTypes.string.isRequired,
};

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 16, height: 16 }} {...props}>
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 16, height: 16 }} {...props}>
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{ width: 16, height: 16 }}
      {...props}
    >
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

function TransitionComponent(props) {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: 'translate3d(20px,0,0)',
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

TransitionComponent.propTypes = {
  in: PropTypes.bool,
};

const StyledTreeItem = styled((props) => (
  <TreeItem {...props} ContentComponent={CustomContent} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
		color: theme.palette.primary.main,
    '& .close': {
      opacity: 1,
			color: theme.palette.primary.main
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 10,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

export default function TasksFolderContents({ data, setData, folder }) {
  return (
		<>
		<TaskSpeedDial setData={setData} folderId={folder.folderId} data={data} />
		<TreeView
			aria-label="customized"
			defaultExpanded={['section0', 'section1', 'section2']}
			defaultCollapseIcon={<MinusSquare />}
			defaultExpandIcon={<PlusSquare />}
			defaultEndIcon={<CloseSquare />}
			sx={{ height: 'inherit', flexGrow: 1, width: '100%', overflowY: 'auto', overflowX: 'hidden', color: 'text.secondary', paddingBottom: '20vh' }}
		>
			{
				data[0].data.map((section, sectionIndex) => {
					return <StyledTreeItem key={`section${sectionIndex}`} 
										nodeId={`section${sectionIndex}`} 
										label={<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '5.25vh' }}>
														<Typography color={'text.secondary'}>{section.sectionName.substring(0, 30)}</Typography>
														<StyledSpeedDial loc={'section'} index={sectionIndex + ''} setData={setData} data={data} folderId={folder.folderId}/>
													</Box>}>
						{section.sectionData.map((task, taskIndex) => {
							return <StyledTreeItem key={`task${sectionIndex}${taskIndex}`} 
												nodeId={`task${sectionIndex}${taskIndex}`} 
												label={<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '5.25vh' }}>
																<Typography sx={{ textDecoration: task.checked ? 'line-through' : 'none', opacity: task.checked ? '0.5' : '1' }} color={'text.secondary'}>{task.taskName.substring(0, 30)}</Typography>
																<StyledSpeedDial checked={task.checked} loc={'task'} index={sectionIndex + ', ' + taskIndex} setData={setData} data={data} folderId={folder.folderId}/>
															</Box>}>
								{task.taskData.map((subtask, subtaskIndex) => {
									return <StyledTreeItem key={`subtask${sectionIndex}${subtaskIndex}${taskIndex}`} 
														nodeId={`subtask${sectionIndex}${subtaskIndex}${taskIndex}`} 
														label={<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '5.25vh' }}>
																		<Typography sx={{ textDecoration: subtask.checked ? 'line-through' : 'none', opacity: subtask.checked ? '0.5' : '1' }} color={'text.secondary'}>{subtask.subtaskName.substring(0, 30)}</Typography>
																		<StyledSpeedDial checked={subtask.checked} loc={'subtask'} index={sectionIndex + ', ' + taskIndex + ', ' + subtaskIndex} setData={setData} data={data} folderId={folder.folderId}/>
																	</Box>} />
								})}
							</StyledTreeItem>
						})}
					</StyledTreeItem>
				})
			}
		</TreeView>
		</>
  );
}
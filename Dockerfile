FROM ros:melodic

# install ros package
RUN apt-get update && apt-get install -y \
      ros-${ROS_DISTRO}-navigation \
      ros-${ROS_DISTRO}-gazebo-ros-control \
      ros-${ROS_DISTRO}-joy \
      ros-${ROS_DISTRO}-teleop-twist-joy \ 
      ros-${ROS_DISTRO}-teleop-twist-keyboard \
      ros-${ROS_DISTRO}-laser-proc \
      ros-${ROS_DISTRO}-rgbd-launch \ 
      ros-${ROS_DISTRO}-depthimage-to-laserscan \
      ros-${ROS_DISTRO}-rosserial-arduino \
      ros-${ROS_DISTRO}-rosserial-python \
      ros-${ROS_DISTRO}-rosserial-server \ 
      ros-${ROS_DISTRO}-rosserial-client \
      ros-${ROS_DISTRO}-rosserial-msgs \ 
      ros-${ROS_DISTRO}-amcl \ 
      ros-${ROS_DISTRO}-map-server \
      ros-${ROS_DISTRO}-move-base \ 
      ros-${ROS_DISTRO}-urdf \
      ros-${ROS_DISTRO}-xacro \
      ros-${ROS_DISTRO}-compressed-image-transport \ 
      ros-${ROS_DISTRO}-rqt* \
      ros-${ROS_DISTRO}-gmapping \  
      ros-${ROS_DISTRO}-interactive-markers
 
      
      # launch ros package
#CMD ["ros2", "launch", "demo_nodes_cpp", "talker_listener.launch.py"]

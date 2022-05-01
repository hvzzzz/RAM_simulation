FROM ros:melodic

# install ros package
RUN apt-get update && apt-get install -y \
      ros-${ROS_DISTRO}-navigation \
      ros-${ROS_DISTRO}-gazebo-ros-control

# launch ros package
#CMD ["ros2", "launch", "demo_nodes_cpp", "talker_listener.launch.py"]

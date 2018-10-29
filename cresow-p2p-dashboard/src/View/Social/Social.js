import React, { Component } from 'react';
import ContentHeader from '../../Components/Content/ContentHeader';
import ContentBody from '../../Components/Content/ContentBody';
import Timeline from '../../Components/Timeline/Timeline';
import TimelineLabel from '../../Components/Timeline/TimelineLabel';
import TimelineItem from '../../Components/Timeline/TimelineItem';
import './Social.scss';

class Social extends Component {
  render() {
    return(
      <div>
        <ContentHeader section="social-header content-header">
          <h3>Social</h3>
        </ContentHeader>
        <ContentBody
          section="social-body content"
          row="row"
          column="col-md-12"
        >
          <div className="row">
            <div className="col-md-9 left-content">
              <Timeline>
                <TimelineLabel date="11 Oct. 2018"/>
                <TimelineItem 
                  icon="fa fa-envelope"
                  iconColorClass="bg-blue"
                  time="3 mins ago"
                  headerUrl="#"
                  headerPerson="Andrew White"
                  headerAction="sent you an email"
                  bodyType="text"
                  bodyContent="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                  footerButtonText="Details"
                />
                <TimelineItem 
                  icon="fa fa-user"
                  iconColorClass="bg-blue"
                  time="22 mins ago"
                  headerUrl="#"
                  headerPerson="Paul Whitney"
                  headerAction="changed to Paul Adam Whitney"
                />
                <TimelineItem 
                  icon="fa fa-user-plus"
                  iconColorClass="bg-blue"
                  time="40 mins ago"
                  headerUrl="#"
                  headerPerson="Sarah Mercy"
                  headerAction="accepted your friend request"
                />
                <TimelineItem 
                  icon="fa fa-plus"
                  iconColorClass="bg-blue"
                  time="52 mins ago"
                  headerUrl="#"
                  headerPerson="Julie Parson"
                  headerAction="was added from Offline App"
                />
                <TimelineLabel date="10 Oct. 2018"/>
                <TimelineItem 
                  icon="fa fa-link"
                  iconColorClass="bg-blue"
                  time="1 day ago"
                  headerUrl="#"
                  headerPerson="Mina Lee"
                  headerAction="uploaded new photos"
                  bodyType="images"
                  bodyContent={[
                    { 'src' : 'http://placehold.it/150x100', 'alt' : '...'},
                    { 'src' : 'http://placehold.it/150x100', 'alt' : '...'},
                    { 'src' : 'http://placehold.it/150x100', 'alt' : '...'}
                  ]}
                />
                <TimelineItem 
                  icon="fa fa-link"
                  iconColorClass="bg-blue"
                  time="1 day ago"
                  headerUrl="#"
                  headerPerson="David Leah"
                  headerAction="shared a video"
                  bodyType="video"
                  bodyContent={[
                    { 'src' : 'https://www.youtube.com/embed/tMWkeBIohBs'},
                  ]}
                />
              </Timeline>
            </div>
            <div className="col-md-3 right-content">
            </div>
          </div>
        </ContentBody>
      </div>
    )
  }
}

export default Social;
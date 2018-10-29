import React, {Component} from 'react';

export default class TimelineItem extends Component {
    constructor(props) {
        super(props);
        this.state= {
            data: {
                icon : this.props.icon,
                iconColorClass : this.props.iconColorClass,
                time : this.props.time,
                headerUrl : this.props.headerUrl,
                headerPerson : this.props.headerPerson,
                headerAction : this.props.headerAction,
                bodyType : this.props.bodyType,
                bodyContent : this.props.bodyContent,
                footerButtonText : this.props.footerButtonText,
            },
        };
    }
    render(){
        return (
            <li>
                <i className={this.state.data.icon+' '+this.state.data.iconColorClass}></i>
                <div className="timeline-item">
                    <span className="time"><i className="fa fa-clock-o"></i> {this.state.data.time}</span>

                    <h3 className="timeline-header"><a href={this.state.data.headerUrl}>{this.state.data.headerPerson}</a> {this.state.data.headerAction}</h3>

                    {
                        this.state.data.bodyContent && (this.state.data.bodyType === "text" ) && (
                            <div className="timeline-body">
                                {this.state.data.bodyContent}
                            </div>
                        )
                    }

                    {
                        this.state.data.bodyContent && (this.state.data.bodyType === "images" ) && (
                            <div className="timeline-body">
                                {
                                    this.state.data.bodyContent.map(((element, i) => {
                                        return(
                                            <img key={i} src={element.src} alt={element.alt} className="margin"></img>
                                        )
                                    }))
                                }
                            </div>
                        )
                    }

                    {
                        this.state.data.bodyContent && (this.state.data.bodyType === "video" ) && (
                            <div className="timeline-body">
                                {
                                    this.state.data.bodyContent.map(((element, i) => {
                                        return(
                                            <div className="embed-responsive embed-responsive-16by9" key={i}>
                                                <iframe className="embed-responsive-item" src={element.src} frameBorder="0" allowFullScreen="" title="cat" />
                                            </div>
                                        )
                                    }))
                                }
                            </div>
                        )
                    }

                    {
                        this.state.data.footerButtonText && (
                            <div className="timeline-footer">
                                <button className="btn btn-primary btn-xs">{this.state.data.footerButtonText}</button>
                            </div>
                        )
                    }
                </div>
            </li>
        )
    }
}
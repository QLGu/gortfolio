var React = require('react');
var Grid = require('../components/Grid.js');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var gridSvc = require('../service/gridSvc.js');
var _ = require('lodash');


var Portfolio = React.createClass({
	getInitialState: function(){
		var items = [
				{
					name:'1th item',
					url:"item1",
					img:'http://placehold.it/200x320/227DAC/fff',
				},
				{
					name:'2th item',
					url:"item2",
					img:'http://placehold.it/200x320/A3BB7E/fff',
				},
				{
					name:'3th item',
					url:"item3",
					img:'http://placehold.it/200x320/636aBC/fff',
				},
				{
					name:'4th item',
					url:"item4",
					img:'http://placehold.it/400x320/CC7B5D/fff',
				},
				{
					name:'5th item',
					url:"item5",
					img:'http://placehold.it/400x320/816F7C/fff',
				},
				{
					name:'6th item',
					url:"item6",
					img:'http://placehold.it/500x320/936aBC/fff',
				},
				{
					name:'7th item',
					url:"item7",
					img:'http://placehold.it/200x420/93aFBC/fff',
				},
				{
					name:'8th item',
					url:"item8",
					img:'http://placehold.it/200x420/136FBC/fff',
				},
				{
					name:'9th item',
					url:"item9",
					img:'http://placehold.it/400x320/936FBC/fff',
				},
				{
					name:'10th item',
					url:"item10",
					img:'http://placehold.it/600x320/936FBC/fff',
				},
				{
					name:'11th item',
					url:"item11",
					img:'http://placehold.it/200x550/63D5E7/fff',
				},
				{
					name:'12th item',
					url:"item12",
					img:'http://placehold.it/300x220/236FBC/fff',
				},
				{
					name:'13th item',
					url:"item13",
					img:'http://placehold.it/200x320/EBC575/fff',
				}
			];

		this.grid = gridSvc({
			gridWidth: window.innerWidth - 20,
			minItemWidth:280,
			itemLength: items.length,
		});

		var gridData =  this.grid.fill();
		console.log(gridData);

		return {
			items: items,
			gridData:gridData,
		}
	},
	componentWillMount: function(){
		
	},
	componentDidMount:function(){
		this.debouncedFill = _.debounce( this.refill , 200);
		// add window resize event listener
		window.addEventListener('resize', this.debouncedFill );
	},
	componentWillUnmount:function(){
		// remove grid resize listener
		window.removeEventListener('resize',this.debouncedFill  );

	},
	refill:function(){
		var gridData = this.grid.refill();


		this.setState({
			gridData: gridData,
		});
	},
	render: function(){
		var items = [];
		this.state.items.forEach(function(item,index){
			var style = {
				backgroundImage: 'url('+item.img+')',
			};
			var itemid = 'pf-'+item.url;

			items.push(
				<a id={itemid} href={'#/portfolio/'+item.url} className="portfolio-item" style={style}>
					<span>{item.name}</span>
				</a>
			)
		});

		return (
			<section className="gf-view" id="gf-portfolio">
				<Grid items={items} gridData={this.state.gridData}  />
				<div id="gf-portfolio-item">
					<RouteHandler {...this.props}/>
				</div>
			</section>
		);
	}
}); // createClass


module.exports = Portfolio;
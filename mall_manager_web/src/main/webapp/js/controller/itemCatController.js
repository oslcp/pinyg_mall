 //控制层 
app.controller('itemCatController' ,function($scope,$controller,itemCatService,typeTemplateService){
	
	$controller('baseController',{$scope:$scope});//继承

	$scope.parentId=0;//上级ID
	$scope.greade=1;
	$scope.searchEntity={};//定义搜索对象
	$scope.typeList={data:[]};

    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		itemCatService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	};
	
	//分页
	$scope.findPage=function(page,rows){			
		itemCatService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	};
	
	//查询实体 
	$scope.findOne=function(id){				
		itemCatService.findOne(id).success(
			function(response){
				$scope.entity= response;					
			}
		);				
	};
	
	//保存 
	$scope.save=function(){				
		var serviceObject;//服务层对象  				
		if($scope.entity.id!=null){//如果有ID
			$scope.entity.typeId=$scope.entity.typeTemplate.id;
			serviceObject=itemCatService.update( $scope.entity ); //修改  
		}else{
			$scope.entity.parentId=$scope.parentId;
			$scope.entity.typeId=$scope.entity.typeTemplate.id;
			serviceObject=itemCatService.add( $scope.entity  );//增加
		}				
		serviceObject.success(
			function(response){
				if(response.success){
					//重新查询 
					$scope.findByParentId($scope.parentId);//重新加载
				}else{
					alert(response.message);
				}
			}
		);				
	};
	
	 
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
		itemCatService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
					$scope.reloadList();//刷新列表
				}						
			}		
		);				
	};
	
	//搜索
	$scope.search=function(page,rows){			
		itemCatService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	};

	//根据上级Id查询
	$scope.findByParentId = function (parentId) {
		$scope.parentId=parentId;
		itemCatService.findByParentId(parentId).success(
			function (result) {
				$scope.list=result;
			}
		)
	};

	$scope.setGrade=function (value) {
		$scope.greade = value;
	};

	$scope.selectList=function (p_entity) {
		$scope.parentId=p_entity.id;
		if($scope.greade==1){
			$scope.entity_1=null;
			$scope.entity_2=null;
		}else if($scope.greade==2){
			$scope.entity_1=p_entity;
			$scope.entity_2=null;
		}else if ($scope.greade==3){
			$scope.entity_2=p_entity;
		}
		$scope.findByParentId(p_entity.id);
	};

	//读取模板列表
	$scope.findTypeList=function(){
		typeTemplateService.selectTypeList().success(
			function(response){
				$scope.typeList={data:response};
			}
		);
	};

	$scope.findTypeList();

	//编辑
	$scope.editItemCat = function(itemCat){
		$scope.findTypeList();
		$scope.typeList.data.forEach(function (type) {
			$scope.entity = itemCat;
			if(type.id==itemCat.typeId){
				$scope.entity.typeTemplate=type;
				return;
			}
		});
	};
    
});	

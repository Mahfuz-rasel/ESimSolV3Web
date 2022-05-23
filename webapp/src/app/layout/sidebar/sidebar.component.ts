// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'sidebar',
//   templateUrl: './sidebar.component.html',
//   styleUrls: ['./sidebar.component.css']
// })
// export class SidebarComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }




import {
  Component,
  ChangeDetectionStrategy,
  Renderer2,
  OnInit
} from '@angular/core';
import { ICSTree, ITreeNode } from 'src/shared/BO/TreeObjects';
import { ITreeOptions } from 'src/shared/Reusable/ics-tree/ics-tree.component';
import { ETreeOperation } from 'src/shared/Enums';
// import { LayoutStoreService } from '@shared/layout/layout-store.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
  sidebarExpanded: boolean;

  public iTreeOptions: ITreeOptions;
  private treeNode: ITreeNode;
  public reload = 0;
  private menuIDs: number[] = [];


  status: boolean = false;
  // clickEvent(){
  //     this.status = !this.status;       
  // }

  constructor(
    private renderer: Renderer2,
    // private _layoutStore: LayoutStoreService
  ) { }

  ngOnInit(): void {
    // this._layoutStore.sidebarExpanded.subscribe((value) => {
    //   this.sidebarExpanded = value;
    //   this.toggleSidebar();
    // });
    debugger
    this.treeNode = { NodeID: 0, ParentID: 0, Text: '' };
    this.iTreeOptions = {
      TreeData: new ICSTree(),
      MultipleSelection: false,
      collapsible: true
    };
    this.getMenuList();


  }

  // public StaticMenuTree = [

  //   { objGUID: "", objID: 2, parentID: 1, menuName: "Menu", menuSequence: 1, actionName: "" },
  //   { objGUID: "", objID: 3, parentID: 2, menuName: "Home", menuSequence: 1, actionName: "Home" },
  //   { objGUID: "", objID: 4, parentID: 2, menuName: "Bazars", menuSequence: 2, actionName: "BazarCollection" },
  //   { objGUID: "", objID: 5, parentID: 2, menuName: "product gallery", menuSequence: 3, actionName: "ProductGallery" }
  // ];


public StaticMenuTree =[{"objGUID":"960005fe-5148-454a-b996-a92875a26824","objID":46,"parentID":41,"menuName":"Basic Setup","menuSequence":0,"actionName":"","controllerName":"","callParamType":0,"callParamTypeStr":{"objID":0,"text":"None","value":""},"callParamValue":"","serviceName":"","isActive":false,"isDeleted":false,"errorMsg":""},{"objGUID":"0418d5e4-fbbc-4c1d-be33-98d92612d689","objID":3,"parentID":2,"menuName":"হোম","menuSequence":1,"actionName":"Home","controllerName":"HomeComponent","callParamType":2,"callParamTypeStr":{"objID":2,"text":"2","value":""},"callParamValue":"asdf","serviceName":"werwed","isActive":true,"isDeleted":false,"errorMsg":""},{"objGUID":"022202dd-c0f6-42fe-ba49-f43af1359364","objID":16,"parentID":2,"menuName":"বাজার ","menuSequence":2,"actionName":"BazarCollection","controllerName":"","callParamType":0,"callParamTypeStr":{"objID":0,"text":"None","value":""},"callParamValue":"","serviceName":"","isActive":false,"isDeleted":false,"errorMsg":""},
{"objGUID":"cc01191f-c54e-4e85-b8d4-b6c20d514dfe","objID":43,"parentID":2,"menuName":"বিক্রেতা / পাইকার","menuSequence":3,"actionName":"ProdCategoryLeafs","controllerName":"","callParamType":0,"callParamTypeStr":{"objID":0,"text":"None","value":""},"callParamValue":"","serviceName":"","isActive":false,"isDeleted":false,"errorMsg":""},{"objGUID":"4dbe9fd1-e121-4301-8daf-5f9ed6f2f481","objID":44,"parentID":2,"menuName":"ক্রেতা / দোকান","menuSequence":4,"actionName":"LocationCards","controllerName":"","callParamType":0,"callParamTypeStr":{"objID":0,"text":"None","value":""},"callParamValue":"","serviceName":"","isActive":false,"isDeleted":false,"errorMsg":""},{"objGUID":"7d006be0-f0da-4c81-88ab-c1b334aab95e","objID":17,"parentID":2,"menuName":"পণ্য প্রদর্শনী","menuSequence":5,"actionName":"PBCollection","controllerName":"","callParamType":0,"callParamTypeStr":{"objID":0,"text":"None","value":""},"callParamValue":"","serviceName":"","isActive":false,"isDeleted":false,"errorMsg":""},{"objGUID":"ea3019ba-a637-4724-afa7-4ad88c956d05","objID":14,"parentID":2,"menuName":"মাই-সাইট","menuSequence":6,"actionName":"mySite/:id","controllerName":"","callParamType":0,"callParamTypeStr":{"objID":0,"text":"None","value":""},"callParamValue":"","serviceName":"","isActive":false,"isDeleted":false,"errorMsg":""},{"objGUID":"e1a7dae8-8d38-4a0c-82f1-f87076b38c97","objID":30,"parentID":2,"menuName":"নিজস্ব ক্রেতা তালিকা ","menuSequence":7,"actionName":"accountPartners","controllerName":"","callParamType":0,"callParamTypeStr":{"objID":0,"text":"None","value":""},"callParamValue":"","serviceName":"","isActive":false,"isDeleted":false,"errorMsg":""},{"objGUID":"27a08a58-f6c5-42b2-a489-02d2d35fe4cf","objID":23,"parentID":2,"menuName":"প্রচারণা / মার্কেটিং","menuSequence":8,"actionName":"promotion","controllerName":"","callParamType":0,"callParamTypeStr":{"objID":0,"text":"None","value":""},"callParamValue":"","serviceName":"","isActive":false,"isDeleted":false,"errorMsg":""},{"objGUID":"ce1f68c7-2d59-472b-9200-1353a1ac2737","objID":4,"parentID":2,"menuName":"একাউন্ট সেটিংস","menuSequence":9,"actionName":"User","controllerName":"","callParamType":0,"callParamTypeStr":{"objID":0,"text":"None","value":""},"callParamValue":"","serviceName":"","isActive":false,"isDeleted":false,"errorMsg":""},
{"objGUID":"1565ebc4-ba89-4fe2-8eb8-9caaaeaf9957","objID":45,"parentID":2,"menuName":"সরাসরি কথোপকথন","menuSequence":10,"actionName":"liveChat_NC","controllerName":"","callParamType":0,"callParamTypeStr":{"objID":0,"text":"None","value":""},"callParamValue":"","serviceName":"","isActive":false,"isDeleted":false,"errorMsg":""},{"objGUID":"337c7b48-1204-4a26-b3cf-0a9761a96d91","objID":40,"parentID":2,"menuName":"System Management","menuSequence":12,"actionName":"","controllerName":"","callParamType":0,"callParamTypeStr":{"objID":0,"text":"None","value":""},"callParamValue":"fdsf","serviceName":"dfsfd","isActive":true,"isDeleted":false,"errorMsg":""},{"objGUID":"033bb4f2-caba-4e3a-9fb5-f2175c25ab01","objID":41,"parentID":2,"menuName":"Basic Setup","menuSequence":13,"actionName":"","controllerName":"","callParamType":0,"callParamTypeStr":{"objID":0,"text":"None","value":""},"callParamValue":"rtret","serviceName":"treter","isActive":true,"isDeleted":false,"errorMsg":""},{"objGUID":"89cc4807-29fe-4316-94d5-132c77a03841","objID":42,"parentID":2,"menuName":"System Setup","menuSequence":14,"actionName":"","controllerName":"","callParamType":0,"callParamTypeStr":{"objID":0,"text":"None","value":""},"callParamValue":"fgd","serviceName":" fdsfs","isActive":true,"isDeleted":false,"errorMsg":""},{"objGUID":"170c3fc1-c144-4461-a1ad-93dad0406c4a","objID":1,"parentID":0,"menuName":"Root","menuSequence":100,"actionName":"","controllerName":"","callParamType":1,"callParamTypeStr":{"objID":1,"text":"1","value":""},"callParamValue":"asdf","serviceName":"asdf","isActive":true,"isDeleted":false,"errorMsg":""},{"objGUID":"1cbe6849-4133-4bcb-9e4c-10a081395b25","objID":2,"parentID":1,"menuName":"Menu","menuSequence":100,"actionName":"","controllerName":"","callParamType":2,"callParamTypeStr":{"objID":2,"text":"2","value":""},"callParamValue":"awer","serviceName":"awer","isActive":true,"isDeleted":false,"errorMsg":""},{"objGUID":"a27b0397-8853-4ae7-88bd-60238a9321cf","objID":5,"parentID":40,"menuName":"Users","menuSequence":100,"actionName":"Users","controllerName":"","callParamType":0,"callParamTypeStr":{"objID":0,"text":"None","value":""},"callParamValue":"","serviceName":"","isActive":false,"isDeleted":false,"errorMsg":""},{"objGUID":"cce33b37-e34d-49fa-b18c-b8444feb9521","objID":6,"parentID":40,"menuName":"Menu Config","menuSequence":100,"actionName":"MenuConfiguration","controllerName":"","callParamType":0,"callParamTypeStr":{"objID":0,"text":"None","value":""},"callParamValue":"","serviceName":"","isActive":false,"isDeleted":false,"errorMsg":""},{"objGUID":"5bcec7df-5057-4541-836f-c024e828b388","objID":11,"parentID":42,"menuName":"IpBind","menuSequence":100,"actionName":"IpBind","controllerName":"","callParamType":0,"callParamTypeStr":{"objID":0,"text":"None","value":""},"callParamValue":"","serviceName":"","isActive":false,"isDeleted":false,"errorMsg":""},{"objGUID":"188d987b-12b3-47be-b3a4-fc5dbd21b9d4","objID":12,"parentID":41,"menuName":"Address-Entry","menuSequence":100,"actionName":"AddressEntry","controllerName":"","callParamType":0,"callParamTypeStr":{"objID":0,"text":"None","value":""},"callParamValue":"","serviceName":"","isActive":false,"isDeleted":false,"errorMsg":""},
{"objGUID":"72ce19cd-b84d-4fb9-8bec-7075b87c873b","objID":18,"parentID":40,"menuName":"Product Management","menuSequence":100,"actionName":"","controllerName":"","callParamType":0,"callParamTypeStr":{"objID":0,"text":"None","value":""},"callParamValue":"","serviceName":"","isActive":false,"isDeleted":false,"errorMsg":""},
{"objGUID":"7d2af04f-7ba4-48cb-8a03-cedb48998d57","objID":19,"parentID":18,"menuName":"Product Category ","menuSequence":100,"actionName":"ProdCategory","controllerName":"","callParamType":0,"callParamTypeStr":{"objID":0,"text":"None","value":""},"callParamValue":"","serviceName":"","isActive":false,"isDeleted":false,"errorMsg":""},{"objGUID":"635ce189-af11-4465-a571-4b14a494cbeb","objID":20,"parentID":18,"menuName":"Product Filters","menuSequence":100,"actionName":"ProductFilter","controllerName":"","callParamType":0,"callParamTypeStr":{"objID":0,"text":"None","value":""},"callParamValue":"","serviceName":"","isActive":false,"isDeleted":false,"errorMsg":""},{"objGUID":"060e9a04-37ec-4fa4-bbdb-3416194a530f","objID":21,"parentID":42,"menuName":"Operation Logs","menuSequence":100,"actionName":"OperationLog","controllerName":"","callParamType":0,"callParamTypeStr":{"objID":0,"text":"None","value":""},"callParamValue":"","serviceName":"","isActive":false,"isDeleted":false,"errorMsg":""},{"objGUID":"a3a9183b-a88d-4644-b627-59bd50bf83e7","objID":24,"parentID":41,"menuName":"Promotion Note Entry","menuSequence":100,"actionName":"PromoNoteEntry","controllerName":"","callParamType":0,"callParamTypeStr":{"objID":0,"text":"None","value":""},"callParamValue":"","serviceName":"","isActive":false,"isDeleted":false,"errorMsg":""},{"objGUID":"efe8040f-2b3d-4108-a339-2d5a21359f6c","objID":27,"parentID":41,"menuName":"Card Appearence Setup","menuSequence":100,"actionName":"CardAppearence","controllerName":"","callParamType":0,"callParamTypeStr":{"objID":0,"text":"None","value":""},"callParamValue":"","serviceName":"","isActive":false,"isDeleted":false,"errorMsg":""},{"objGUID":"20112503-e0ea-4981-b914-91ebff48a68b","objID":28,"parentID":41,"menuName":"Account Collection","menuSequence":100,"actionName":"AccountCollection","controllerName":"","callParamType":0,"callParamTypeStr":{"objID":0,"text":"None","value":""},"callParamValue":"","serviceName":"","isActive":false,"isDeleted":false,"errorMsg":""},{"objGUID":"1129ef86-9dc2-44d3-b92e-aa786c49ecbc","objID":33,"parentID":41,"menuName":"System Info","menuSequence":100,"actionName":"SystemInfoEntry","controllerName":"","callParamType":0,"callParamTypeStr":{"objID":0,"text":"None","value":""},"callParamValue":"","serviceName":"","isActive":false,"isDeleted":false,"errorMsg":""},{"objGUID":"92f96a9b-7aa4-4cf2-b758-58472d52c05d","objID":34,"parentID":42,"menuName":"Customer Request","menuSequence":100,"actionName":"RequestPublish","controllerName":"","callParamType":0,"callParamTypeStr":{"objID":0,"text":"None","value":""},"callParamValue":"","serviceName":"","isActive":false,"isDeleted":false,"errorMsg":""},{"objGUID":"3efd0f2a-df02-4fcc-800a-9fb2cf621a72","objID":35,"parentID":40,"menuName":"প্যাকেজ অফার ","menuSequence":100,"actionName":"CustomerPackages","controllerName":"","callParamType":0,"callParamTypeStr":{"objID":0,"text":"None","value":""},"callParamValue":"","serviceName":"","isActive":false,"isDeleted":false,"errorMsg":""}
,{"objGUID":"c9f4da86-e8b4-4756-8580-e9145c244da4","objID":36,"parentID":41,"menuName":"Package Feature","menuSequence":100,"actionName":"Features","controllerName":"","callParamType":0,"callParamTypeStr":{"objID":0,"text":"None","value":""},"callParamValue":"","serviceName":"","isActive":false,"isDeleted":false,"errorMsg":""},{"objGUID":"ba2a58ca-c64c-40c0-b97a-0e8e18b4af8a","objID":37,"parentID":41,"menuName":"Job Application List","menuSequence":100,"actionName":"JobApplications","controllerName":"","callParamType":0,"callParamTypeStr":{"objID":0,"text":"None","value":""},"callParamValue":"","serviceName":"","isActive":false,"isDeleted":false,"errorMsg":""},{"objGUID":"1de154b5-fb04-4528-a619-3a9ab2242a44","objID":38,"parentID":2,"menuName":"অনুসন্ধান সমূহ","menuSequence":100,"actionName":"NonLoginMails","controllerName":"","callParamType":0,"callParamTypeStr":{"objID":0,"text":"None","value":""},"callParamValue":"","serviceName":"","isActive":false,"isDeleted":false,"errorMsg":""}]


  public getMenuList(): void {
    debugger
    let moCollection = [];
    moCollection = this.StaticMenuTree;

    moCollection.forEach(item => {
      const nodeItem: ITreeNode = {
        NodeID: item.objID,
        ParentID: item.parentID,
        Text: item.menuName,
        TagValue: item.actionName,
        ItemSequence: item.menuSequence
      };
      this.menuIDs.push(nodeItem.NodeID);
      this.iTreeOptions.TreeData.addNode(nodeItem);
    });
    this.reload = ETreeOperation.PROPAGATE_NODE;

  }

  // toggleSidebar(): void {
  //   if (this.sidebarExpanded) {
  //     this.hideSidebar();
  //   } else {
  //     this.showSidebar();
  //   }
  // }

  // showSidebar(): void {
  //   this.renderer.removeClass(document.body, 'sidebar-collapse');
  //   this.renderer.addClass(document.body, 'sidebar-open');
  // }

  // hideSidebar(): void {
  //   this.renderer.removeClass(document.body, 'sidebar-open');
  //   this.renderer.addClass(document.body, 'sidebar-collapse');
  // }


  public menuSelected(params): void {
    let navigateTo = '';
    if (params.TagValue !== 'Home') {
      navigateTo = params.TagValue;
    }
    // if (params.TagValue.includes('mySite/')) {
    //   this.cs.routingToMySite();
    //   return;
    // }
    // if (params.TagValue.includes('liveChat_NC')) {
    //   //const customer = this.cs.getLoginUserFromSession();
    //  // this.chatService.mooktobazarLiveChat.next(customer);
    // }
    // this.cs.navigateToMenu(navigateTo);
  }

  public reloadTree(params): void {
  }


}//cs


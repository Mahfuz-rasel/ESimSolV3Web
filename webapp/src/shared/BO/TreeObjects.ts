import { Injectable } from '@angular/core';


export interface ITreeNode {
    NodeID: number;
    ParentID: number;
    Text: string;
    TagValue?: any; // ActionName
    haveChild?: boolean;
    ItemSequence?: number;
    expanded?: boolean;
    checked?: boolean;
    indeterminate?: boolean;
    eventType?: string; // later should convert it to enum.....
    canAddChild?: boolean;
    NodeSequence?: number;
    childCount?: number;
    checkedCount?: number;
    uncheckedCount?: number;
    refObj?: any;
}

@Injectable()
export class ICSTree {
    private maxNodeID = 0;
    private NodeList: ITreeNode[];
    private MultipleSelection?: boolean;
    private root: ITreeNode = { NodeID: 0, ParentID: 0, Text: '-Data not found-', checked: false, haveChild: false };
    private leafCount = 0;
    public SelectedIDs?: number[];

    constructor() {
        this.NodeList = [];
        this.SelectedIDs = [0];
    }
    public clear(): void {
        this.NodeList = [];
    }

    public getRoot(): ITreeNode {
        this.NodeList.forEach(node => {
            node.checked = (this.SelectedIDs.includes(node.NodeID)) ? true : false;
            this.checkedCounter(node.ParentID, node.checked);
            node.expanded = true;
            if (node.ParentID === 1) {
                this.root = node;
            }
            if (node.NodeID > this.maxNodeID) {
                this.maxNodeID = node.NodeID;
            }
        });
        return this.root;
    }

    public getParent(cNode: ITreeNode): ITreeNode {
        let parentNode: ITreeNode;
        this.NodeList.forEach(node => {
            if (node.NodeID === cNode.ParentID) {
                parentNode = node;
                return;
            }
        });
        return parentNode;
    }

    private checkedCounter(parentID: number, status: boolean): void {
        this.NodeList.forEach(node => {
            if (node.NodeID === parentID) {
                if (node.childCount === undefined || node.childCount === null) {
                    node.childCount = 0;
                    node.checkedCount = 0;
                    node.uncheckedCount = 0;
                }
                node.childCount++;
                (status === true) ? node.checkedCount++ : node.uncheckedCount++;
            }
        });
    }

    public getHaveChild(cNode: ITreeNode): boolean {
        return (cNode.childCount > 0);
    }

    public getIndeterminate(cNode: ITreeNode): boolean {
        if (cNode.childCount > 0) {
            return (cNode.checkedCount > 0 && cNode.uncheckedCount > 0);
        }
        return false;
    }

    public getNodeByNodeID(nodeID: number): ITreeNode {
        let currNode: ITreeNode;
        this.NodeList.forEach(node => {
            if (node.NodeID === nodeID) {
                currNode = node;
                return;
            }
        });
        return currNode;
    }
    public getCheckBoxVal(cNode: ITreeNode): boolean {
        if (cNode.childCount > 0) {
            if (cNode.checkedCount === cNode.childCount) {
                return true;
            }
            if (cNode.uncheckedCount === cNode.childCount) {
                return false;
            }
        }
        // this.SelectedIDs.push(cNode);
        return cNode.checked;
    }

    public getMaxNodeID(): number {
        return this.maxNodeID;
    }

    public addNode(newNode: ITreeNode, curNode?: ITreeNode): void {
        if (curNode !== undefined) {
            this.NodeList.forEach(node => {
                if (node.NodeID === newNode.ParentID) {
                    if (node.childCount === null || node.childCount === undefined) {
                        node.childCount = 0;
                    }
                    node.childCount++;
                    node.expanded = true;
                    return;
                }
            });
        }
        this.NodeList.push(newNode);
    }

    public updateNode(curNode: ITreeNode): void {
        const thatNodeList = this.NodeList;
        for (let i = 0; i < thatNodeList.length; i++) {
            if (thatNodeList[i].NodeID === curNode.NodeID) {
                thatNodeList[i] = curNode;
                break;
            }
        }
        this.NodeList = thatNodeList;
    }

    public deleteAllChilds(cNode: ITreeNode): void {
        // decreament the childCount of the parentNode of currentNode..,.
        this.NodeList.forEach(node => {
            if (node.NodeID === cNode.ParentID) {
                node.childCount--;
                return;
            }
        });
        const childs: ITreeNode[] = this.getChildren(cNode.NodeID);
        childs.forEach(node => {
            this.deleteAllChilds(node);
        });
        this.NodeList.forEach(node => {
            if (cNode.NodeID === node.NodeID) {
                this.NodeList.splice(this.NodeList.indexOf(node), 1);
                return;
            }
        });
    }

    public setIndeterminate(cNode: ITreeNode, checked?: boolean): void {
        if (cNode === null || cNode === undefined) { return; }
        this.NodeList.forEach(node => {
            if (node.NodeID === cNode.NodeID) {
                node.indeterminate = cNode.indeterminate;
                if (checked !== undefined) { node.checked = checked; }
                return;
            }
        });
    }

    public checkUncheckAll(cNode: ITreeNode): void {
        this.NodeList.forEach(node => {
            if (node.NodeID === cNode.NodeID) {
                node.checked = cNode.checked;
                return;
            }
        });
        const childs: ITreeNode[] = this.getChildren(cNode.NodeID);
        childs.forEach(node => {
            node.checked = cNode.checked;
            this.checkUncheckAll(node);
        });
    }

    public isIndeterminate(cNode: ITreeNode): ITreeNode {
        if (cNode === null || cNode === undefined) {
            return cNode;
          }
        const childNodes: ITreeNode[] = this.getChildren(cNode.NodeID);
        let indCount = 0;
        let chkCount = 0;
        let unchkCount = 0;
        childNodes.forEach(node => {
            if (node.indeterminate === true) {
                indCount++;
                return;
            }
            else if (node.checked === true) {
                chkCount++;
            }
            else {
                unchkCount++;
            }
        });
        if (indCount > 0 || (chkCount > 0 && unchkCount > 0)) {
            cNode.indeterminate = true;
            cNode.checked = false;
        }
        else if (chkCount === childNodes.length && unchkCount <= 0) {
            cNode.checked = true;
            cNode.indeterminate = false;
        }
        else if (unchkCount === childNodes.length && chkCount <= 0) {
            cNode.checked = false;
            cNode.indeterminate = false;
        }
        this.setIndeterminate(cNode);
        return cNode;
    }

    public addSelectedNodeParent(parentNode: ITreeNode): void {
        if (parentNode.NodeID === this.root.ParentID) { return; }

        if (!this.SelectedIDs.includes(parentNode.NodeID)) {
            this.SelectedIDs.push(parentNode.NodeID);
            this.addSelectedNodeParent(this.getParent(parentNode));
        }
    }
    public removeSelectedNodeParent(parentNode: ITreeNode): void {
        if (parentNode.NodeID === this.root.ParentID) { return; }

        const childs = this.getChildren(parentNode.NodeID);
        let allExcluded = true;
        childs.forEach(node => {
            if (this.SelectedIDs.includes(node.NodeID)) {
                allExcluded = false;
            }
        });
        if (allExcluded === true) {
            this.SelectedIDs.splice(this.SelectedIDs.indexOf(parentNode.NodeID), 1);
        }
        this.removeSelectedNodeParent(this.getParent(parentNode));
    }
    public updateSelectedIDs(cNode: ITreeNode): void {
        const childs: ITreeNode[] = this.getChildren(cNode.NodeID);
        if (cNode.checked === true) {
            childs.forEach(node => {
                if (!this.SelectedIDs.includes(node.NodeID)) {
                    this.SelectedIDs.push(node.NodeID);
                    this.updateSelectedIDs(node);
                }
            });
            if (!this.SelectedIDs.includes(cNode.NodeID)) {
                this.SelectedIDs.push(cNode.NodeID); // after inserting all of current node's childs to the array, push itself;
                this.addSelectedNodeParent(this.getParent(cNode));// upward
            }
        }
        else if (cNode.checked === false) {
            childs.forEach(node => {
                if (this.SelectedIDs.includes(node.NodeID)) {
                    this.updateSelectedIDs(node);
                }
            });
            if (this.SelectedIDs.includes(cNode.NodeID)) {
                this.SelectedIDs.splice(this.SelectedIDs.indexOf(cNode.NodeID), 1);
            }
            this.removeSelectedNodeParent(this.getParent(cNode)); // upward... 
        }
    }
    public getChildren(ParentID: number): Array<ITreeNode> {
        const childs = Array<ITreeNode>();
        this.NodeList.forEach(node => {
            if (node.ParentID === ParentID) {
                childs.push(node);
            }
        });
        childs.sort((a, b) => a.NodeSequence - b.NodeSequence);
        return childs;
    }

    public setMultipleSelection(status: boolean): void {
        this.MultipleSelection = status;
    }
}
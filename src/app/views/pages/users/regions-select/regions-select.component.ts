import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Injectable } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { UtilioService } from 'src/app/service/utilio.service';
import { ProviderRegion, ProviderRegionData } from 'src/app/models/providerRegion';

/** Flat node with expandable and level information */
export class ProviderRegionFlatNode {
  data: ProviderRegionData = new ProviderRegionData();
  public children?: ProviderRegion[];
  level!: number;
  expandable!: boolean;
}

@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<ProviderRegion[]>([]);
  regions: ProviderRegion[] = [];
  providerRegions: ProviderRegion[] = [];
  providerRegion!: ProviderRegion; 

  get data(): ProviderRegion[] {
    return this.dataChange.value;
  }

  constructor(private service: UtilioService) {
    this.initialize();
  }

  initializeData(id: number) {
    this.getProviderRegions(id);
  }

   /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
   buildFileTree(obj: { [key: string]: any }, level: number): ProviderRegion[] {
    return Object.keys(obj).reduce<ProviderRegion[]>((accumulator, key) => {
      const value = obj[key];
      const node = new ProviderRegion();
      node.data!.name = obj[key].data.name;
      node.data!.id = obj[key].data.id;

      if (value != null) {
        if (typeof value === 'object' && value.children != undefined) {
          node.children = this.buildFileTree(value.children, level + 1);
        } else {
          node.data!.name = value.data.name;
          node.data!.id = value.data.id;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  private getProviderRegions(providerId: number): void {
    this.regions = [];
    this.service.getProviderRegions(providerId).subscribe((regions) => {
      regions.forEach(region => this.regions.push(
        new ProviderRegion(
          {
            id: region.data?.id, 
            name: region.data?.name, 
            code: region.data?.code, 
            providerExists: region.data?.providerExists,
            isSelected: false
          },
          region.children
        )
      ))

      this.filterProviderRegions();
      this.initialize();
    });
  }

  private filterProviderRegions(): void {
    let providerKantoni: ProviderRegion[] = [];
    let providerOpcine: ProviderRegion[] = [];

    this.providerRegion = {...this.regions[0]}
    this.providerRegion.children = [];

    const entiteti = this.regions[0].children;

    if (entiteti) {
      if (entiteti[0]?.children) {
        const kantoni = entiteti[0].children;

        kantoni?.forEach(kanton => {
          providerOpcine = [];
          kanton.children?.forEach(opcina => {
            if(opcina.data?.providerExists == 1) {
              providerOpcine.push(opcina);
            }
          })
          if (providerOpcine?.length !== 0) {
            let newKanton = {...kanton}
            newKanton.children = providerOpcine;
            providerKantoni?.push(newKanton);
          }
        })
        if (providerKantoni.length !== 0) {
          let newEntitet = new ProviderRegion();
          newEntitet = {...entiteti[0]};
          newEntitet.children = providerKantoni;

          this.providerRegion.children?.push(newEntitet);
        }
      }
      if (entiteti[1]?.children) {
        const opcine = entiteti[1].children;
        providerOpcine = [];
        opcine?.forEach(opcina => {
          if (opcina.data?.providerExists == 1) {
            providerOpcine.push(opcina);
          }
        })
        if (providerOpcine?.length !== 0) {
          let newEntitet = new ProviderRegion();
          newEntitet = {...entiteti[1]};
          newEntitet.children = providerOpcine;

          this.providerRegion.children?.push(newEntitet);
        }
      }
    }

    this.providerRegions = [];

    if (this.providerRegion.data.providerExists == 1)
      this.providerRegions.push(this.providerRegion);
  }

  private initialize() {
    const data = this.buildFileTree(this.providerRegions, 0);

    this.dataChange.next(data);
  }
}

@Component({
  selector: 'app-regions-select',
  templateUrl: './regions-select.component.html',
  styleUrls: ['./regions-select.component.scss'],
  providers: [ChecklistDatabase],
})
export class RegionsSelectComponent {
  @Input() providerId: number = 0;
  @Input() accountRoles?: any[] = [];
  @Output() rolesChangeEvent = new EventEmitter<ProviderRegionFlatNode[]>();

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<ProviderRegionFlatNode, ProviderRegion>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<ProviderRegion, ProviderRegionFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: ProviderRegionFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<ProviderRegionFlatNode>;

  treeFlattener: MatTreeFlattener<ProviderRegion, ProviderRegionFlatNode>;

  dataSource: MatTreeFlatDataSource<ProviderRegion, ProviderRegionFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<ProviderRegionFlatNode>(
    true /* multiple */
  );

  constructor(private _database: ChecklistDatabase, private service: UtilioService,) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<ProviderRegionFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    _database.dataChange.subscribe((data) => {
      this.dataSource.data = data;
    });

    if(this.providerId !== 0) {
      _database.initializeData(this.providerId);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['providerId']) {
      this._database.initializeData(this.providerId);
    }
  }

  getLevel = (node: ProviderRegionFlatNode) => node.level;

  isExpandable = (node: ProviderRegionFlatNode) => node.expandable;

  getChildren = (node: ProviderRegion): ProviderRegion[] => node.children!;

  hasChild = (_: number, _nodeData: ProviderRegionFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: ProviderRegionFlatNode) =>
    _nodeData.data?.name === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: ProviderRegion, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.data!.name === node.data!.name
        ? existingNode
        : new ProviderRegionFlatNode();
    flatNode.data!.id = node.data!.id;
    flatNode.data!.name = node.data!.name;
    flatNode.data!.providerExists = node.data!.providerExists;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;

    if (this.isSelected(flatNode.data.name)) this.checklistSelection.select(flatNode);

    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: ProviderRegionFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every((child) => {
        return this.checklistSelection.isSelected(child);
      });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: ProviderRegionFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some((child) =>
      this.checklistSelection.isSelected(child)
    );
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: ProviderRegionFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach((child) => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: ProviderRegionFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: ProviderRegionFlatNode): void {
    let parent: ProviderRegionFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: ProviderRegionFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every((child) => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }

    this.saveSelectedNodes();
  }

  /* Get the parent node of a node */
  getParentNode(node: ProviderRegionFlatNode): ProviderRegionFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  saveSelectedNodes() {
    this.rolesChangeEvent.emit(this.checklistSelection.selected);
  }

  private isSelected(name: string): boolean {
    if (this.accountRoles && (this.accountRoles?.filter(e => e.regionName === name).length > 0))
      return true;
    return false;
  }
}

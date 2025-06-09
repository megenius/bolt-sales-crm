import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, DollarSign, Calendar, User } from 'lucide-react';

const Deals: React.FC = () => {
  const [deals, setDeals] = useState({
    'qualified': [
      { id: '1', title: 'Acme Corp Integration', value: '$15,000', contact: 'Sarah Johnson', dueDate: '2024-02-15', probability: 25 },
      { id: '2', title: 'TechStart Platform', value: '$8,500', contact: 'Mike Chen', dueDate: '2024-02-20', probability: 30 }
    ],
    'proposal': [
      { id: '3', title: 'Global Solutions Suite', value: '$22,000', contact: 'Emma Davis', dueDate: '2024-02-10', probability: 65 },
      { id: '4', title: 'Innovation Labs Tool', value: '$12,000', contact: 'Robert Wilson', dueDate: '2024-02-25', probability: 55 }
    ],
    'negotiation': [
      { id: '5', title: 'Enterprise Package', value: '$35,000', contact: 'Lisa Anderson', dueDate: '2024-02-08', probability: 80 },
    ],
    'closed': [
      { id: '6', title: 'Startup Package', value: '$5,500', contact: 'David Kim', dueDate: '2024-01-30', probability: 100 }
    ]
  });

  const stages = [
    { id: 'qualified', title: 'Qualified', color: 'bg-blue-50 border-blue-200' },
    { id: 'proposal', title: 'Proposal', color: 'bg-yellow-50 border-yellow-200' },
    { id: 'negotiation', title: 'Negotiation', color: 'bg-orange-50 border-orange-200' },
    { id: 'closed', title: 'Closed Won', color: 'bg-green-50 border-green-200' }
  ];

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    
    if (source.droppableId !== destination.droppableId) {
      const sourceItems = [...deals[source.droppableId as keyof typeof deals]];
      const destItems = [...deals[destination.droppableId as keyof typeof deals]];
      const [movedItem] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, movedItem);

      setDeals({
        ...deals,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destItems
      });
    } else {
      const items = [...deals[source.droppableId as keyof typeof deals]];
      const [movedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, movedItem);

      setDeals({
        ...deals,
        [source.droppableId]: items
      });
    }
  };

  const getTotalValue = (stageId: string) => {
    return deals[stageId as keyof typeof deals].reduce((sum, deal) => {
      return sum + parseInt(deal.value.replace(/[$,]/g, ''));
    }, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Deals Pipeline</h1>
          <p className="text-slate-600 mt-2">Track and manage your sales opportunities</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Deal</span>
        </button>
      </div>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stages.map((stage) => (
          <div key={stage.id} className="bg-white rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">{stage.title}</h3>
            <p className="text-2xl font-bold text-slate-900 mt-2">
              ${getTotalValue(stage.id).toLocaleString()}
            </p>
            <p className="text-sm text-slate-500 mt-1">
              {deals[stage.id as keyof typeof deals].length} deals
            </p>
          </div>
        ))}
      </div>

      {/* Kanban Board */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stages.map((stage) => (
              <div key={stage.id} className={`rounded-lg border-2 border-dashed p-4 ${stage.color}`}>
                <h3 className="font-semibold text-slate-900 mb-4">{stage.title}</h3>
                <Droppable droppableId={stage.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`space-y-3 min-h-[200px] ${
                        snapshot.isDraggingOver ? 'bg-blue-50 rounded-lg' : ''
                      }`}
                    >
                      {deals[stage.id as keyof typeof deals].map((deal, index) => (
                        <Draggable key={deal.id} draggableId={deal.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white rounded-lg border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow cursor-move ${
                                snapshot.isDragging ? 'shadow-lg transform rotate-3' : ''
                              }`}
                            >
                              <h4 className="font-medium text-slate-900 mb-2">{deal.title}</h4>
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2 text-sm text-slate-600">
                                  <DollarSign className="w-4 h-4" />
                                  <span className="font-semibold">{deal.value}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-slate-600">
                                  <User className="w-4 h-4" />
                                  <span>{deal.contact}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-slate-600">
                                  <Calendar className="w-4 h-4" />
                                  <span>{deal.dueDate}</span>
                                </div>
                                <div className="mt-3">
                                  <div className="flex items-center justify-between text-sm mb-1">
                                    <span className="text-slate-600">Probability</span>
                                    <span className="font-medium">{deal.probability}%</span>
                                  </div>
                                  <div className="w-full bg-slate-200 rounded-full h-2">
                                    <div 
                                      className="bg-blue-600 h-2 rounded-full transition-all"
                                      style={{ width: `${deal.probability}%` }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Deals;
from fastapi import APIRouter

from app.schemas.request import SimulationRequest
from app.schemas.response import SimulationResponse
from app.services.simulation_service import simulate_network


router = APIRouter(tags=["simulate"])


@router.post("/simulate", response_model=SimulationResponse)
async def simulate(request: SimulationRequest) -> SimulationResponse:
    result = simulate_network(text=request.text, steps=request.steps)
    return SimulationResponse(
        graph_stats=result["graph_stats"],
        propagation_metrics=result["propagation_metrics"],
    )
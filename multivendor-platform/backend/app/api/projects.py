from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import os, json

router = APIRouter()

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', '..', 'data')
os.makedirs(DATA_DIR, exist_ok=True)
PROJECTS_PATH = os.path.join(DATA_DIR, 'projects.json')


class Project(BaseModel):
    id: int
    project_type: str
    template: str
    features: dict = {}


def read_projects():
    try:
        with open(PROJECTS_PATH, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return []


def write_projects(data):
    with open(PROJECTS_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


@router.get('/', response_model=List[Project])
async def list_projects():
    return read_projects()


@router.post('/', response_model=Project)
async def create_project(p: Project):
    projects = read_projects()
    if any(pr['id'] == p.id for pr in projects):
        raise HTTPException(status_code=400, detail='id exists')
    projects.append(p.dict())
    write_projects(projects)
    return p


@router.get('/{project_id}', response_model=Project)
async def get_project(project_id: int):
    projects = read_projects()
    for pr in projects:
        if pr['id'] == project_id:
            return pr
    raise HTTPException(status_code=404, detail='not found')


@router.put('/{project_id}', response_model=Project)
async def update_project(project_id: int, p: Project):
    projects = read_projects()
    for i, pr in enumerate(projects):
        if pr['id'] == project_id:
            projects[i] = p.dict()
            write_projects(projects)
            return p
    raise HTTPException(status_code=404, detail='not found')


@router.delete('/{project_id}')
async def delete_project(project_id: int):
    projects = read_projects()
    new = [pr for pr in projects if pr['id'] != project_id]
    if len(new) == len(projects):
        raise HTTPException(status_code=404, detail='not found')
    write_projects(new)
    return {'ok': True}

/* eslint-disable prettier/prettier */
/* eslint-disable filenames/match-regex */
export interface RunResponseInterface {
  offset: number;
  limit: number;
  size: number;
  _links: Links;
  runs: Run[];
}

export interface Run {
  id: number;
  name: string;
  is_completed?: boolean
}

export interface Links {
  next: string;
  prev?: unknown | undefined;
}

export interface GetRunResponse {
  assignedto_id: number;
  blocked_count: number;
  completed_on?: string;
  config: string;
  config_ids: number[];
  created_by: number;
  created_on: number;
  refs: string;
  custom_status1_count: number;
  custom_status2_count: number;
  custom_status3_count: number;
  custom_status4_count: number;
  custom_status5_count: number;
  custom_status6_count: number;
  custom_status7_count: number;
  description?: string;
  failed_count: number;
  id: number;
  include_all: boolean;
  is_completed: boolean;
  milestone_id: number;
  name: string;
  passed_count: number;
  plan_id: number;
  project_id: number;
  retest_count: number;
  suite_id: number;
  untested_count: number;
  updated_on?: string;
  url: string;
}
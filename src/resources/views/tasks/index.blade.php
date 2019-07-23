{{-- resources/views/admin/dashboard.blade.php --}}

@extends('adminlte::page')

@section('content')
    <section class="content-header">
        <h1 class="pull-left">Tarefas</h1>
        <h1 class="pull-right">
           <a class="btn btn-primary pull-right" style="margin-top: -10px;margin-bottom: 5px" href="{!! route('tasks.create') !!}">Nova</a>
        </h1>
    </section>
    <div class="content">
        <div class="clearfix"></div>
        <div class="box box-primary">
            <div class="box-body">
                <div id='tasks_list'></div>            
            </div>
        </div>
    </div>
@stop